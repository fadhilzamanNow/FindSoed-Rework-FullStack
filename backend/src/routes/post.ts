import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { PrismaClient } from "../../generated/prisma";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import upload from "../middleware/upload";
import { uploadMultipleToS3, getS3Url } from "../services/s3Upload";
import { success, error } from "../utils/response";

dayjs.extend(localizedFormat);

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return error(res, "Token tidak ditemukan", { token: "Token diperlukan" }, 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).userId = (decoded as any).userId;
    next();
  } catch (err) {
    return error(res, "Token tidak valid", { token: "Token expired atau tidak valid" }, 401);
  }
};

router.get("/userpost", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const findPost = await prisma.post.findMany({
      where: { userId },
      select: {
        id: true,
        status: { select: { statusName: true } },
        itemName: true,
      },
    });

    const userPost = findPost
      .map((v) => ({
        postId: v.id,
        status: v.status.statusName,
        itemName: v.itemName,
      }))
      .sort((a, b) => a.postId.localeCompare(b.postId));

    success(res, "Data berhasil diperoleh", userPost);
  } catch (e) {
    error(res, "Terjadi kesalahan server", undefined, 500);
  }
});

router.post(
  "/create",
  verifyToken,
  upload.array("postImage", 5),
  async (req: Request, res: Response) => {
    const {
      itemName,
      itemDetail,
      itemCategory,
      itemLatitude,
      itemLongitude,
      locationName,
      itemLostDate,
    } = req.body;

    const errors: Record<string, string> = {};
    if (!itemName) errors.itemName = "Nama barang masih kosong";
    if (!itemDetail) errors.itemDetail = "Deskripsi barang masih kosong";
    if (!itemCategory) errors.itemCategory = "Kategori barang masih kosong";
    if (!itemLatitude) errors.itemLatitude = "Latitude masih kosong";
    if (!itemLongitude) errors.itemLongitude = "Longitude masih kosong";
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      errors.postImage = "Mohon masukkan gambar";
    }

    if (Object.keys(errors).length > 0) {
      return error(res, "Validasi gagal", errors);
    }

    try {
      const statusId = await prisma.postStatus.findUnique({
        where: { statusName: "Hilang" },
      });
      const categoryId = await prisma.postCategory.findUnique({
        where: { categoryName: itemCategory },
      });

      if (!statusId || !categoryId) {
        return error(res, "Data tidak valid", {
          ...(!statusId && { status: "Status tidak tersedia" }),
          ...(!categoryId && { category: "Kategori tidak tersedia" }),
        });
      }

      const s3Keys = await uploadMultipleToS3(
        req.files as Express.Multer.File[],
        "post-images"
      );
      const imageArray = s3Keys.map((key) => ({ postImageUrl: key }));

      const posts = await prisma.post.create({
        data: {
          itemName,
          itemDetail,
          itemLostDate: new Date(itemLostDate),
          userId: (req as any).userId,
          categoryId: categoryId.id,
          statusId: statusId.id,
          image: { create: imageArray },
          coordinate: {
            create: {
              locationName,
              latitude: Number(itemLatitude),
              longitude: Number(itemLongitude),
            },
          },
        },
      });

      success(res, "Barang Hilang telah dibuat", { id: posts.id, name: posts.itemName }, 201);
    } catch (err) {
      error(res, "Terjadi kesalahan server", undefined, 500);
    }
  }
);

router.patch("/edit/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { itemStatus, itemDetail, itemLostDate } = req.body;

    const oldPost = await prisma.post.findUnique({ where: { id: req.params.id } });
    if (!oldPost) {
      return error(res, "Post tidak ditemukan", { id: "Post tidak ditemukan" }, 404);
    }

    let statusId: number | null = null;
    if (itemStatus) {
      const findStatus = await prisma.postStatus.findFirst({
        where: { statusName: itemStatus },
      });
      if (findStatus) statusId = findStatus.id;
    }

    const newPost = await prisma.post.update({
      where: { id: oldPost.id },
      data: {
        updated_at: new Date(),
        itemDetail: itemDetail || oldPost.itemDetail,
        statusId: statusId || oldPost.statusId,
        itemLostDate: itemLostDate ? new Date(itemLostDate) : oldPost.itemLostDate,
      },
    });

    success(res, "Data berhasil untuk diperbarui", newPost);
  } catch (e) {
    error(res, "Data gagal untuk diubah", undefined, 500);
  }
});

router.get("/detail/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const findDetailPost = await prisma.post.findFirst({
      where: { id: req.params.id },
      select: {
        id: true,
        user: {
          select: {
            username: true,
            profile: true,
            phoneNumber: true,
          },
        },
        status: { select: { statusName: true } },
        category: { select: { categoryName: true } },
        created_at: true,
        updated_at: true,
        itemDetail: true,
        itemName: true,
        coordinate: true,
        comment: true,
        image: true,
        itemLostDate: true,
      },
    });

    if (!findDetailPost) {
      return error(res, "Post tidak ditemukan", { id: "Post tidak ditemukan" }, 404);
    }

    const formattedPost = {
      id: findDetailPost.id,
      userName: findDetailPost.user.username,
      userProfile: findDetailPost.user.profile?.imageUrl
        ? getS3Url(findDetailPost.user.profile.imageUrl)
        : null,
      itemName: findDetailPost.itemName,
      itemDetail: findDetailPost.itemDetail,
      statusName: findDetailPost.status.statusName,
      itemCategory: findDetailPost.category.categoryName,
      images: findDetailPost.image.map((v) => getS3Url(v.postImageUrl)),
      created_at: findDetailPost.created_at,
      updated_at: findDetailPost.updated_at,
      coordinate: {
        latitude: findDetailPost.coordinate?.latitude,
        longitude: findDetailPost.coordinate?.longitude,
      },
      commentNum: findDetailPost.comment.length,
      itemLostDate: dayjs(findDetailPost.itemLostDate).format("LLL"),
      phoneNumber: findDetailPost.user.phoneNumber,
    };

    success(res, "Berhasil mendapatkan detail Post", formattedPost);
  } catch (e) {
    error(res, "Gagal mendapatkan detail Post", undefined, 500);
  }
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        user: { select: { username: true, profile: true } },
        status: { select: { statusName: true } },
        category: { select: { categoryName: true } },
        created_at: true,
        updated_at: true,
        itemDetail: true,
        itemName: true,
        coordinate: true,
        comment: true,
        image: true,
      },
    });

    const formattedPosts = posts.map((v) => ({
      id: v.id,
      userName: v.user.username,
      userProfile: v.user.profile?.imageUrl ? getS3Url(v.user.profile.imageUrl) : null,
      itemName: v.itemName,
      itemDetail: v.itemDetail,
      statusName: v.status.statusName,
      categoryName: v.category.categoryName,
      images: v.image.map((img) => getS3Url(img.postImageUrl)),
      created_at: v.created_at,
      updated_at: v.updated_at,
      coordinate: {
        latitude: v.coordinate?.latitude,
        longitude: v.coordinate?.longitude,
      },
      commentNum: v.comment.length,
    }));

    success(res, "Data berhasil diperoleh", formattedPosts);
  } catch (e) {
    error(res, "Terjadi kesalahan server", undefined, 500);
  }
});

router.get("/:searchitem", async (req: Request, res: Response) => {
  try {
    const findPosts = await prisma.post.findMany({
      where: {
        itemName: { contains: req.params.searchitem, mode: "insensitive" },
      },
      select: {
        id: true,
        user: { select: { username: true, profile: true } },
        status: { select: { statusName: true } },
        category: { select: { categoryName: true } },
        created_at: true,
        updated_at: true,
        itemDetail: true,
        itemName: true,
        coordinate: true,
        comment: true,
        image: true,
      },
    });

    const formattedPosts = findPosts.map((v) => ({
      id: v.id,
      userName: v.user.username,
      userProfile: v.user.profile?.imageUrl ? getS3Url(v.user.profile.imageUrl) : null,
      itemName: v.itemName,
      itemDetail: v.itemDetail,
      statusName: v.status.statusName,
      categoryName: v.category.categoryName,
      images: v.image.map((img) => getS3Url(img.postImageUrl)),
      created_at: v.created_at,
      updated_at: v.updated_at,
      coordinate: {
        latitude: v.coordinate?.latitude,
        longitude: v.coordinate?.longitude,
      },
      commentNum: v.comment.length,
    }));

    success(res, "Data berhasil diperoleh", formattedPosts);
  } catch (e) {
    error(res, "Gagal untuk mencari post", undefined, 500);
  }
});

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  if (!req.params.id) {
    return error(res, "ID tidak ditemukan", { id: "ID diperlukan" });
  }

  try {
    await prisma.postImages.deleteMany({ where: { postId: req.params.id } });
    await prisma.comments.deleteMany({ where: { postId: req.params.id } });
    await prisma.coordinates.deleteMany({ where: { postId: req.params.id } });
    const deletePosts = await prisma.post.delete({ where: { id: req.params.id } });

    success(res, "Post berhasil dihapus", { id: deletePosts.id });
  } catch (err) {
    error(res, "Gagal menghapus post", undefined, 500);
  }
});

router.get("/userpostdetail/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const findUserPostDetail = await prisma.post.findUnique({
      where: { id: req.params.id },
    });

    if (!findUserPostDetail) {
      return error(res, "Post tidak ditemukan", { id: "Post tidak ditemukan" }, 404);
    }

    const findCategory = await prisma.postCategory.findUnique({
      where: { id: findUserPostDetail.categoryId },
    });
    const findStatus = await prisma.postStatus.findUnique({
      where: { id: findUserPostDetail.statusId },
    });

    success(res, "Data Post berhasil didapatkan", {
      id: findUserPostDetail.id,
      itemName: findUserPostDetail.itemName,
      itemLostDate: findUserPostDetail.itemLostDate,
      itemDescription: findUserPostDetail.itemDetail,
      itemCategory: findCategory?.categoryName,
      itemStatus: findStatus?.statusName,
    });
  } catch (e) {
    error(res, "Terjadi kesalahan server", undefined, 500);
  }
});

export { router as postRouter };
