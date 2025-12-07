import express, { Request, Response } from "express";
import axios from "axios";
import { success, error } from "../utils/response";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  success(res, "Location route aktif");
});

router.get("/find/:placename", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${req.params.placename}&apiKey=${process.env.GEOAPIFY_SECRET}&format=json&limit=10&lang=id`
    );

    const formattedResponse = response.data.results.map((v: any) => ({
      latitude: v.lat,
      longitude: v.lon,
      locationName: v.formatted,
    }));

    success(res, "Data berhasil didapatkan", formattedResponse);
  } catch (e) {
    error(res, "Terdapat kesalahan", undefined, 500);
  }
});

router.get("/reverse/lat=:lat&lon=:lon", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${req.params.lat}&lon=${req.params.lon}&apiKey=${process.env.GEOAPIFY_SECRET}`
    );

    success(res, "Data berhasil didapatkan", response.data.features[0].properties.formatted);
  } catch (e) {
    error(res, "Data gagal untuk didapatkan", undefined, 500);
  }
});

export { router as locationRouter };
