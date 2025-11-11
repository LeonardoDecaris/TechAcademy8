import { Router } from "express";
import {
  getAllCargoImages,
  createCargoImage,
  getCargoImageById,
  updateCargoImage,
  deleteCargoImage,
} from "../controllers/cargo-image.controller";

const router = Router();

router.get("/", getAllCargoImages);
router.post("/", createCargoImage);
router.get("/:id", getCargoImageById);
router.put("/:id", updateCargoImage);
router.delete("/:id", deleteCargoImage);

export default router;