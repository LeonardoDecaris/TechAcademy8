import { Router } from "express";
import {
  getAllCargos,
  createCargo,
  getCargoById,
  updateCargo,
  deleteCargo,
} from "../controllers/cargo.controller";

const router = Router();

router.get("/", getAllCargos);
router.post("/", createCargo);
router.get("/:id", getCargoById);
router.put("/:id", updateCargo);
router.delete("/:id", deleteCargo);

export default router;