import { Request, Response } from "express";
import axios from "axios";
import Frete from "../models/frete.model";

const MONOLITH_URL = process.env.MONOLITH_URL || "http://backend:3000";
const CARGAS_PATH = process.env.MONOLITH_CARGAS_PATH || "/carga";
const EMPRESAS_PATH = process.env.MONOLITH_EMPRESAS_PATH || "/empresa";
const CAMINHONEIROS_PATH = process.env.MONOLITH_CAMINHONEIROS_PATH || "/caminhoneiro";

export const createFrete = async (req: Request, res: Response) => {
  try {
    const frete = await Frete.create(req.body);
    return res.status(201).json(frete);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const getAllFretes = async (req: Request, res: Response) => {
  try {
    const fretes = await Frete.findAll();
    const auth = req.headers.authorization;
    const headers = auth ? { Authorization: auth } : undefined;

    const enriched = await Promise.all(
      fretes.map(async (f) => {
        const data = typeof (f as any)?.toJSON === "function" ? (f as any).toJSON() : f;

        const carga_id = data.cargaId ?? data.carga_id;
        const empresa_id = data.empresaId ?? data.empresa_id;
        const caminhoneiro_id = data.caminhoneiroId ?? data.caminhoneiro_id;

        const [carga, empresa, caminhoneiro] = await Promise.all([
          carga_id ? axios.get(`${MONOLITH_URL}${CARGAS_PATH}/${carga_id}`, { headers }).then(r => r.data).catch(() => null) : null,
          empresa_id ? axios.get(`${MONOLITH_URL}${EMPRESAS_PATH}/${empresa_id}`, { headers }).then(r => r.data).catch(() => null) : null,
          caminhoneiro_id ? axios.get(`${MONOLITH_URL}${CAMINHONEIROS_PATH}/${caminhoneiro_id}`, { headers }).then(r => r.data).catch(() => null) : null,
        ]);

        return { ...data, carga, empresa, caminhoneiro };
      })
    );

    return res.status(200).json(enriched);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

