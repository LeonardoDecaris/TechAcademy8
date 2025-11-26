import { Request, Response } from "express";
import AppError from "../utils/AppError";
import {
  createFreteService,
  listFretesService,
  updateFreteService,
  deleteFreteService,
  getFreteByIdService,
  listFretesByCaminhoneiroService,
} from "../services/frete.service";
import { z } from "zod";
import { updateFreteSchema, createFreteSchema } from "../schemas/frete.schema";

function parseId(raw: string, label: string): number {
  const id = Number(raw);
  if (!Number.isFinite(id)) {
    throw new AppError(400, `ID inválido: ${label}`);
  }
  
  return id;
}

function handleError(res: Response, error: any) {
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }
  if (error instanceof z.ZodError) {
    return res.status(400).json({ errors: error.issues });
  }
  return res.status(500).json({ message: error.message || "Internal server error" });
}

export const getAllFretes = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    const enriched = await listFretesService(auth);
    return res.status(200).json(enriched);
  } catch (e) {
    return handleError(res, e);
  }
};

export const getFreteById = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id, "frete");
    const auth = req.headers.authorization;
    const frete = await getFreteByIdService(id, auth);
    return res.status(200).json(frete);
  } catch (e) {
    return handleError(res, e);
  }
};

export const createFrete = async (req: Request, res: Response) => {
  try {
    const parsed = await createFreteSchema.parseAsync(req.body);
    const auth = req.headers.authorization;
    const frete = await createFreteService(parsed, auth);
    return res.status(201).json(frete);
  } catch (e) {
    return handleError(res, e);
  }
};

export const updateFrete = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id, "frete");
    const parsed = await updateFreteSchema.parseAsync(req.body);
    const auth = req.headers.authorization;
    const frete = await updateFreteService(id, parsed, auth);
    return res.status(200).json(frete);
  } catch (e) {
    return handleError(res, e);
  }
};

export const deleteFrete = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id, "frete");
    await deleteFreteService(id);
    return res.status(204).send();
  } catch (e) {
    return handleError(res, e);
  }
};

export const getFretesByCaminhoneiro = async (req: Request, res: Response) => {
  try {
    const caminhoneiroId = parseId(req.params.caminhoneiroId, "caminhoneiro");
    const auth = req.headers.authorization;
    const fretes = await listFretesByCaminhoneiroService(caminhoneiroId, auth);
    return res.status(200).json(fretes);
  } catch (e) {
    return handleError(res, e);
  }
};


