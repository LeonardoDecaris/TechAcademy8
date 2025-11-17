import { Router } from "express";
import * as freteController from "../controllers/frete.controller";

const router = Router();

router.get("/", freteController.getAllFretes);
router.post("/", freteController.createFrete);
router.get("/:id", freteController.getFreteById) 
router.put("/:id", freteController.updateFrete);
router.delete("/:id", freteController.deleteFrete);
router.get("/caminhoneiro/:caminhoneiroId", freteController.getFretesByCaminhoneiro);

export default router;