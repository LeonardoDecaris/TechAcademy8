import { Router } from "express";
import * as freteController from "../controllers/frete.controller";

const router = Router();

// não repita /fretes aqui; o app.ts já monta em /fretes
router.get("/", freteController.getAllFretes);
router.post("/", freteController.createFrete);
// router.get("/:id", freteController.getById) // se tiver

export default router;