import { Router } from "express";
import {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller";

const router = Router();

router.get("/", getAllCompanies);
router.post("/", createCompany);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;