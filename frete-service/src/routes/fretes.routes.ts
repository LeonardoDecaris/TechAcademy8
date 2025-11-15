import { Router } from "express";
import * as freteController from "../controllers/frete.controller";

const router = Router();

// não repita /fretes aqui; o app.ts já monta em /fretes
router.get("/", freteController.getAllFretes);
router.post("/", freteController.createFrete);
// router.get("/:id", freteController.getById) // se tiver
router.put("/:id", freteController.updateFrete);
router.delete("/:id", freteController.deleteFrete);

export default router;