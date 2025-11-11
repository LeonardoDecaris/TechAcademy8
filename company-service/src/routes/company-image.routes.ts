import { Router } from "express";
import {
  getAllCompanyImages,
  createCompanyImage,
  getCompanyImageById,
  updateCompanyImage,
  deleteCompanyImage,
} from "../controllers/company-image.controller";

const router = Router();

router.get("/", getAllCompanyImages);
router.post("/", createCompanyImage);
router.get("/:id", getCompanyImageById);
router.put("/:id", updateCompanyImage);
router.delete("/:id", deleteCompanyImage);

export default router;