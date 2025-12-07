import express, { Request, Response } from "express";
import path from "path";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { authRouter } from "./routes/auth";
import { postRouter } from "./routes/post";
import { commentRouter } from "./routes/comment";
import cors from "cors";
import { locationRouter } from "./routes/location";
import upload from "./middleware/upload";
import { uploadMultipleToS3, getS3Url } from "./services/s3Upload";
import { PrismaClient } from "../generated/prisma";
import { success, error } from "./utils/response";
import "dotenv/config";

const app = express();
const port = 3500;
const OASSpec = YAML.load(path.join(__dirname, "openapi.yaml"));
const prisma = new PrismaClient();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(OASSpec));
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res: Response) => {
  res.redirect("/api-docs");
});

app.get("/test", (req: Request, res: Response) => {
  success(res, "Testing aja");
});

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/location", locationRouter);

app.use("/static", express.static(path.join(__dirname, "public")));

app.post(
  "/upload",
  upload.array("images", 5),
  async (req: Request, res: Response) => {
    try {
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        return error(res, "Upload gagal", { images: "Gambar diperlukan" });
      }

      const s3Keys = await uploadMultipleToS3(
        req.files as Express.Multer.File[],
        "uploads"
      );

      const filesArray = s3Keys.map((key, i) => ({
        id: i,
        filename: key,
        url: getS3Url(key),
      }));

      success(res, "Gambar berhasil untuk dikirim", {
        itemName: req.body.itemName,
        files: filesArray,
      }, 201);
    } catch (err) {
      error(res, "Error uploading images to S3", undefined, 500);
    }
  }
);

app.get("/category", async (req: Request, res: Response) => {
  try {
    const category = await prisma.postCategory.findMany();
    success(res, "Data kategori berhasil didapatkan", category);
  } catch (err) {
    error(res, "Gagal mendapatkan kategori", undefined, 500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
