import { Router } from "express";
import {
  getAllStatus,
  createStatus,
  getStatusById,
  updateStatus,
  deleteStatus,
} from "../controllers/status.controller";

const router = Router();

router.get("/", getAllStatus);
router.post("/", createStatus);
router.get("/:id", getStatusById);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

export default router;