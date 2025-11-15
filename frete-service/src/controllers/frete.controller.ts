import { Request, Response } from "express";
import AppError from "../utils/AppError";
import { createFreteService, listFretesService, updateFreteService, deleteFreteService, getFreteByIdService } from "../services/frete.service";
import { z } from "zod";
import { createFreteSchema, updateFreteSchema } from "../schemas/frete.schema";

export const getAllFretes = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    const enriched = await listFretesService(auth);
    return res.status(200).json(enriched);
  } catch (error: any) {
    if (error instanceof AppError) return res.status(error.status).json({ message: error.message });
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const getFreteById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ message: "ID inválido" });
    const auth = req.headers.authorization;
    const frete = await getFreteByIdService(id, auth);
    return res.status(200).json(frete);
  } catch (error: any) {
    if (error instanceof AppError) return res.status(error.status).json({ message: error.message });
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const createFrete = async (req: Request, res: Response) => {
  try {
    const parsed = await createFreteSchema.parseAsync(req.body);
    const auth = req.headers.authorization;
    const frete = await createFreteService(parsed, auth);
    return res.status(201).json(frete);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ errors: error.issues });
    if (error instanceof AppError) return res.status(error.status).json({ message: error.message });
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const updateFrete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ message: "ID inválido" });
    const parsed = await updateFreteSchema.parseAsync(req.body);
    const auth = req.headers.authorization;
    const frete = await updateFreteService(id, parsed, auth);
    return res.status(200).json(frete);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ errors: error.issues });
    if (error instanceof AppError) return res.status(error.status).json({ message: error.message });
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const deleteFrete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ message: "ID inválido" });
    await deleteFreteService(id);
    return res.status(204).send();
  } catch (error: any) {
    if (error instanceof AppError) return res.status(error.status).json({ message: error.message });
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};


