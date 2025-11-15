import axios from "axios";
import Frete from "../models/frete.model";
import Status from "../models/status.model";
import { ensureCaminhoneiroExists, ensureEmpresaExists, ensureCargaExists } from "./monolith.validation";
import AppError from "../utils/AppError";

const MONOLITH_URL = process.env.MONOLITH_URL || "http://backend:3000/api";
const CARGAS_PATH = process.env.MONOLITH_CARGAS_PATH || "/carga";
const EMPRESAS_PATH = process.env.MONOLITH_EMPRESAS_PATH || "/empresa";
const CAMINHONEIROS_PATH = process.env.MONOLITH_CAMINHONEIROS_PATH || "/caminhoneiro";

function normalizeFretePayload(input: any) {
  const out: any = {};
  if (input.descricao !== undefined) out.descricao = input.descricao;
  if (input.origem !== undefined) out.origem = input.origem;
  if (input.destino !== undefined) out.destino = input.destino;
  if (input.distanciaDestino !== undefined) out.distanciaDestino = input.distanciaDestino;
  if (input.prazo !== undefined) out.prazo = input.prazo;

  const status_id = input.status_id ?? input.statusId;
  if (status_id !== undefined) out.status_id = status_id;

  const empresa_id = input.empresa_id ?? input.empresaId;
  if (empresa_id !== undefined) out.empresa_id = empresa_id;

  const carga_id = input.carga_id ?? input.cargaId;
  if (carga_id !== undefined) out.carga_id = carga_id;

  const caminhoneiro_id = input.caminhoneiro_id ?? input.caminhoneiroId;
  if (caminhoneiro_id !== undefined) out.caminhoneiro_id = caminhoneiro_id;

  return out;
}

export async function createFreteService(payload: any, auth?: string) {
  const headers = auth ? { Authorization: auth } : undefined;

  await ensureCaminhoneiroExists(payload.caminhoneiro_id, headers);
  await ensureEmpresaExists(payload.empresa_id, headers);
  await ensureCargaExists(payload.carga_id, headers);

  const frete = await Frete.create(payload);
  return frete;
}

export async function listFretesService(auth?: string) {
  const headers = auth ? { Authorization: auth } : undefined;

  const fretes = await Frete.findAll({
    include: [
      {
        model: Status,
        as: 'status',
        required: false
      }
    ]
  });

  return Promise.all(
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
}

export async function updateFreteService(id: number, payload: any, auth?: string) {
  const headers = auth ? { Authorization: auth } : undefined;
  const data = normalizeFretePayload(payload);

  if (data.caminhoneiro_id !== undefined) {
    await ensureCaminhoneiroExists(data.caminhoneiro_id, headers);
  }
  if (data.empresa_id !== undefined) {
    await ensureEmpresaExists(data.empresa_id, headers);
  }
  if (data.carga_id !== undefined) {
    await ensureCargaExists(data.carga_id, headers);
  }

  const frete = await Frete.findByPk(id);
  if (!frete) throw new AppError(404, "Frete não encontrado");

  await frete.update(data);
  return frete;
}

export async function deleteFreteService(id: number) {
  const frete = await Frete.findByPk(id);
  if (!frete) throw new AppError(404, "Frete não encontrado");
  await frete.destroy();
}

export async function getFreteByIdService(id: number, auth?: string) {
  const headers = auth ? { Authorization: auth } : undefined;

  const frete = await Frete.findByPk(id, {
    include: [
      {
        model: Status,
        as: 'status',
        required: false
      }
    ]
  });
  if (!frete) throw new AppError(404, "Frete não encontrado");

  const data = typeof (frete as any).toJSON === "function" ? (frete as any).toJSON() : frete;

  const carga_id = data.cargaId ?? data.carga_id;
  const empresa_id = data.empresaId ?? data.empresa_id;
  const caminhoneiro_id = data.caminhoneiroId ?? data.caminhoneiro_id;

  const [carga, empresa, caminhoneiro] = await Promise.all([
    carga_id ? axios.get(`${MONOLITH_URL}${CARGAS_PATH}/${carga_id}`, { headers }).then(r => r.data).catch(() => null) : null,
    empresa_id ? axios.get(`${MONOLITH_URL}${EMPRESAS_PATH}/${empresa_id}`, { headers }).then(r => r.data).catch(() => null) : null,
    caminhoneiro_id ? axios.get(`${MONOLITH_URL}${CAMINHONEIROS_PATH}/${caminhoneiro_id}`, { headers }).then(r => r.data).catch(() => null) : null,
  ]);

  return { ...data, carga, empresa, caminhoneiro };
}