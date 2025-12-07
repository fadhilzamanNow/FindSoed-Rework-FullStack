import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
import upload from "../middleware/upload";
import { uploadToS3, deleteFromS3, getS3Url } from "../services/s3Upload";
import { success, error } from "../utils/response";

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

router.get("/", (req: Request, res: Response) => {
  success(res, "Auth route aktif");
});

router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password, phoneNumber } = req.body;
  const errors: Record<string, string> = {};

  if (!username) errors.username = "Username tidak disediakan";
  if (!email) errors.email = "Email tidak disediakan";
  if (!password) errors.password = "Password tidak disediakan";

  if (Object.keys(errors).length > 0) {
    return error(res, "Validasi gagal", errors);
  }

  try {
    const findEmail = await prisma.user.findUnique({ where: { email } });
    if (findEmail) {
      return error(res, "Registrasi gagal", { email: "Email sudah digunakan" });
    }

    const createUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        ...(phoneNumber && { phoneNumber }),
      },
    });

    success(res, "Akunmu berhasil terdaftar di FindSoed", {
      id: createUser.id,
      username: createUser.username,
      email: createUser.email,
    }, 201);
  } catch (e) {
    error(res, "Terjadi kesalahan server", undefined, 500);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const errors: Record<string, string> = {};

  if (!email) errors.email = "Email belum dimasukkan";
  if (!password) errors.password = "Password belum dimasukkan";

  if (Object.keys(errors).length > 0) {
    return error(res, "Validasi gagal", errors);
  }

  try {
    const findEmail = await prisma.user.findUnique({ where: { email } });
    if (!findEmail) {
      return error(res, "Login gagal", { email: "Email tidak tersedia" }, 404);
    }

    if (findEmail.password !== password) {
      return error(res, "Login gagal", { password: "Password salah" }, 401);
    }

    const findProfile = await prisma.profile.findUnique({
      where: { userId: findEmail.id },
    });

    const token = jwt.sign(
      { userId: findEmail.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    success(res, "Login Berhasil", {
      token,
      userId: findEmail.id,
      username: findEmail.username,
      email: findEmail.email,
      phoneNumber: findEmail.phoneNumber || null,
      imageUrl: findProfile?.imageUrl ? getS3Url(findProfile.imageUrl) : null,
    });
  } catch (e) {
    error(res, "Terjadi kesalahan server", undefined, 500);
  }
});

router.get("/find", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const findUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!findUser) {
      return error(res, "User tidak ditemukan", undefined, 404);
    }

    const findProfile = await prisma.profile.findUnique({
      where: { userId: findUser.id },
    });

    success(res, "Berhasil mendapat informasi pengguna", {
      userId: findUser.id,
      username: findUser.username,
      email: findUser.email,
      phoneNumber: findUser.phoneNumber,
      imageUrl: findProfile?.imageUrl ? getS3Url(findProfile.imageUrl) : null,
    });
  } catch (err) {
    error(res, "Terjadi kesalahan server", undefined, 500);
  }
});

router.patch(
  "/editprofile",
  verifyToken,
  upload.single("profilePhoto"),
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const findUser = await prisma.user.findUnique({ where: { id: userId } });
      const findProfile = await prisma.profile.findUnique({ where: { userId } });

      const s3Key = req.file ? await uploadToS3(req.file, "profile-images") : null;

      if (!findProfile) {
        const newProfile = await prisma.profile.create({
          data: { imageUrl: s3Key, userId },
        });

        return success(res, "Foto Profile telah berhasil untuk dirubah", {
          userId: findUser?.id,
          username: findUser?.username,
          email: findUser?.email,
          phoneNumber: findUser?.phoneNumber,
          imageUrl: newProfile.imageUrl ? getS3Url(newProfile.imageUrl) : null,
        }, 201);
      }

      if (findProfile.imageUrl) {
        try {
          await deleteFromS3(findProfile.imageUrl);
        } catch (e) {
          console.error("Error deleting old profile image:", e);
        }
      }

      const updateProfile = await prisma.profile.update({
        where: { userId },
        data: { imageUrl: s3Key },
      });

      success(res, "Foto Profile telah berhasil untuk dirubah", {
        userId: findUser?.id,
        username: findUser?.username,
        email: findUser?.email,
        phoneNumber: findUser?.phoneNumber,
        imageUrl: updateProfile.imageUrl ? getS3Url(updateProfile.imageUrl) : null,
      }, 201);
    } catch (e) {
      error(res, "Terjadi kesalahan server", undefined, 500);
    }
  }
);

router.patch("/editdata", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { userPassword, userPhoneNumber } = req.body;

    const findUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!findUser) {
      return error(res, "User tidak ditemukan", undefined, 404);
    }

    const newUser = await prisma.user.update({
      where: { id: findUser.id },
      data: {
        password: userPassword || findUser.password,
        phoneNumber: userPhoneNumber || findUser.phoneNumber,
      },
    });

    const findProfile = await prisma.profile.findUnique({
      where: { userId: findUser.id },
    });

    success(res, "Data berhasil diubah", {
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      imageUrl: findProfile?.imageUrl ? getS3Url(findProfile.imageUrl) : null,
    });
  } catch (e) {
    error(res, "Terjadi kesalahan server", undefined, 500);
  }
});

export { router as authRouter };
