import { Router } from "express";
import {
  getAllFreights,
  createFreight,
  getFreightById,
  updateFreight,
  deleteFreight,
} from "../controllers/freight.controller";

const router = Router();

router.get("/", getAllFreights);
router.post("/", createFreight);
router.get("/:id", getFreightById);
router.put("/:id", updateFreight);
router.delete("/:id", deleteFreight);

export default router;