import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../../generated/prisma";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getS3Url } from "../services/s3Upload";
import { success, error } from "../utils/response";

const router = express.Router();
const prisma = new PrismaClient();
dayjs.extend(localizedFormat);

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

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  if (!req.params.id) {
    return error(res, "ID tidak ditemukan", { id: "Post ID diperlukan" });
  }

  try {
    const findComment = await prisma.comments.findMany({
      where: { postId: req.params.id },
      select: {
        id: true,
        message: true,
        created_at: true,
        userId: true,
        postId: true,
        updated_at: true,
        user: {
          select: {
            username: true,
            profile: { select: { imageUrl: true } },
          },
        },
      },
      orderBy: { created_at: "asc" },
    });

    const formattedComment = findComment.map((v) => ({
      userName: v.user.username,
      userProfile: v.user.profile?.imageUrl ? getS3Url(v.user.profile.imageUrl) : null,
      message: v.message,
      created_at: dayjs(v.created_at).format("lll"),
    }));

    success(res, "Berhasil mendapatkan komen dari post", formattedComment);
  } catch (err) {
    error(res, "Terjadi kesalahan server", undefined, 500);
  }
});

router.post("/create/:id", verifyToken, async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return error(res, "Validasi gagal", { message: "Pesan tidak boleh kosong" });
  }
  if (!req.params.id) {
    return error(res, "Validasi gagal", { id: "Post ID diperlukan" });
  }

  try {
    const comments = await prisma.comments.create({
      data: {
        message,
        postId: req.params.id,
        userId: (req as any).userId,
      },
    });

    success(res, "Komen berhasil dibuat", comments, 201);
  } catch (err) {
    error(res, "Komen gagal dibuat", undefined, 500);
  }
});

router.patch("/edit/:id", verifyToken, async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return error(res, "Validasi gagal", { message: "Pesan tidak boleh kosong" });
  }
  if (!req.params.id) {
    return error(res, "Validasi gagal", { id: "Comment ID diperlukan" });
  }

  try {
    const newComments = await prisma.comments.update({
      where: { id: req.params.id.trim() },
      data: { message, updated_at: new Date() },
    });

    success(res, "Komen berhasil diedit", newComments);
  } catch (err) {
    error(res, "Komen gagal diedit", undefined, 500);
  }
});

router.delete("/delete/:id", verifyToken, async (req: Request, res: Response) => {
  if (!req.params.id) {
    return error(res, "Validasi gagal", { id: "Comment ID diperlukan" });
  }

  try {
    const comments = await prisma.comments.delete({
      where: { id: req.params.id.trim() },
    });

    success(res, `Komen dengan id: ${comments.id} berhasil dihapus`);
  } catch (err) {
    error(res, "Komen gagal dihapus", undefined, 500);
  }
});

export { router as commentRouter };
