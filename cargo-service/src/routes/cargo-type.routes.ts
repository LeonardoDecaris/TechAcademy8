import { Router } from "express";
import {
  getAllCargoTypes,
  createCargoType,
  getCargoTypeById,
  updateCargoType,
  deleteCargoType,
} from "../controllers/cargo-type.controller";

const router = Router();

router.get("/", getAllCargoTypes);
router.post("/", createCargoType);
router.get("/:id", getCargoTypeById);
router.put("/:id", updateCargoType);
router.delete("/:id", deleteCargoType);

export default router;