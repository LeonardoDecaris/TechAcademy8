import { Router } from "express";
import * as statusController from "../controllers/status.controller";

const router = Router();

router.get("/", statusController.getAllStatus);
// router.get("/:id", statusController.getStatusById);
router.post("/", statusController.createStatus);
// router.put("/:id", statusController.updateStatus);
// router.delete("/:id", statusController.deleteStatus);

// Adicione outras rotas conforme necessário

export default router;