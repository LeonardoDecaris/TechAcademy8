import Frete from "../models/frete.model";
import Status from "../models/status.model";

import {
  ensureEmpresaExists,
  ensureCargaExists,
  ensureCaminhoneiroExists,
} from "./monolith.validation";

import AppError from "../utils/AppError";
import client from "../utils/monolithClient";
import redis from "../config/redisClient";
import { enqueuePendingToNaoIniciado } from "../queues/freteStatus.queue";

if (!process.env.MONOLITH_CARGAS_PATH) {
  console.error("MONOLITH_CARGAS_PATH não está definido nas variáveis de ambiente");
  process.exit(1);
}
if (!process.env.MONOLITH_EMPRESAS_PATH) {
  console.error("MONOLITH_EMPRESAS_PATH não está definido nas variáveis de ambiente");
  process.exit(1);
}
if (!process.env.MONOLITH_CAMINHONEIROS_PATH) {
  console.error("MONOLITH_CAMINHONEIROS_PATH não está definido nas variáveis de ambiente");
  process.exit(1);
}

const CARGAS_PATH = process.env.MONOLITH_CARGAS_PATH;
const EMPRESAS_PATH = process.env.MONOLITH_EMPRESAS_PATH;
const CAMINHONEIROS_PATH = process.env.MONOLITH_CAMINHONEIROS_PATH;

/*
* DESCRIÇÃO: Função para construir os headers de autenticação.
*/
function buildHeaders(auth?: string) {
  return auth ? { Authorization: auth } : undefined;
}

/*
* DESCRIÇÃO: Função para normalizar o payload de frete.
*/
function normalizeFretePayload(input: any) {
  const out: any = {};

  if (input.saida !== undefined) out.saida = input.saida;
  if (input.destino !== undefined) out.destino = input.destino;
  if (input.valor_frete !== undefined) out.valor_frete = input.valor_frete;
  if (input.data_saida !== undefined) out.data_saida = input.data_saida;
  if (input.data_chegada !== undefined) out.data_chegada = input.data_chegada;
  if (input.prazo !== undefined) out.prazo = input.prazo;
  if (input.distancia !== undefined) out.distancia = input.distancia;

  const status_id = input.status_id ?? input.statusId;
  if (status_id !== undefined) out.status_id = status_id;

  const empresa_id = input.empresa_id ?? input.empresaId;
  if (empresa_id !== undefined) out.empresa_id = empresa_id;

  const carga_id = input.carga_id ?? input.cargaId;
  if (carga_id !== undefined) out.carga_id = carga_id;

  const hasCaminhoneiro =
    Object.prototype.hasOwnProperty.call(input, "caminhoneiro_id") ||
    Object.prototype.hasOwnProperty.call(input, "caminhoneiroId");

  if (hasCaminhoneiro) {
    out.caminhoneiro_id = Object.prototype.hasOwnProperty.call(input, "caminhoneiro_id")
      ? input.caminhoneiro_id
      : input.caminhoneiroId;
  }

  return out;
}

/*
* DESCRIÇÃO: Função para extrair IDs relacionados de um frete.
*/
function extractIds(data: any) {
  return {
    cargaId: data.carga_id ?? data.cargaId,
    empresaId: data.empresa_id ?? data.empresaId,
    caminhoneiroId: data.caminhoneiro_id ?? data.caminhoneiroId,
  };
}

/*
* DESCRIÇÃO: Função para buscar uma entidade relacionada.
*/
const cacheLogSet = new Set<string>();

async function fetchEntity(path: string, id?: number, headers?: Record<string, string>) {
  if (!id) return null;
  const cacheKey = `entity:${path}:${id}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      // Não loga hit para evitar poluição
      return JSON.parse(cached);
    }
    const { data } = await client.get(`${path}/${id}`, { headers });
    await redis.set(cacheKey, JSON.stringify(data), "EX", 60 * 1);

    // Só loga o set se ainda não logou nesta execução
    if (!cacheLogSet.has(cacheKey)) {
      console.log(`[CACHE SET] ${cacheKey} - Dados adicionados ao cache`);
      cacheLogSet.add(cacheKey);
    }
    return data;
  } catch (err) {
    console.error(`[CACHE ERROR] ${cacheKey}`, err);
    return null;
  }
}

/*
* DESCRIÇÃO: Função para enriquecer um frete com dados relacionados.
*/
async function enrichFrete(raw: any, headers?: Record<string, string>) {
  const data = typeof raw?.toJSON === "function" ? raw.toJSON() : raw;
  const { cargaId, empresaId, caminhoneiroId } = extractIds(data);

  const [carga, empresa, caminhoneiro] = await Promise.all([
    fetchEntity(CARGAS_PATH, cargaId, headers),
    fetchEntity(EMPRESAS_PATH, empresaId, headers),
    fetchEntity(CAMINHONEIROS_PATH, caminhoneiroId, headers),
  ]);

  return { ...data, carga, empresa, caminhoneiro };
}


/** DESCRIÇÃO: Serviço para criar um novo frete.
*/
export async function createFreteService(payload: any, auth?: string) {
  const headers = buildHeaders(auth);
  const data = normalizeFretePayload(payload);

  if (data.empresa_id !== undefined) await ensureEmpresaExists(data.empresa_id, headers);
  if (data.carga_id !== undefined) await ensureCargaExists(data.carga_id, headers);

  if (data.caminhoneiro_id !== undefined && data.caminhoneiro_id !== null) {
    await ensureCaminhoneiroExists(data.caminhoneiro_id, headers);
  }

  const frete = await Frete.create(data);

  // Removido: Invalidação e atualização do cache da lista após POST

  // se vier como Pendente (1), agenda transição para "Não iniciado" (2)
  const status = frete.get("status_id") as number;
  if (status === 2) {
    await enqueuePendingToNaoIniciado(frete.get("id_frete") as number);
  }

  return frete;
}

/* DESCRIÇÃO: Serviço para listar todos os fretes.
*/
export async function listFretesService(auth?: string) {
  cacheLogSet.clear(); // Limpa antes de processar a lista

  const headers = buildHeaders(auth);
  const cacheKey = "fretes:list";

  // Busca no cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    const enriched = JSON.parse(cached);
    const ids = enriched.map((f: any) => f.id_frete).join(", ");
    console.log(`[CACHE HIT] ${cacheKey} - IDs retornados do cache: [${ids}]`);
    return enriched;
  }

  // Se não achou no cache, busca no banco
  console.log(`[CACHE MISS] ${cacheKey} - Buscando no banco`);
  const fretes = await Frete.findAll({
    include: [{
      model: Status, as: "status",
      required: false
    }],
  });
  const enriched = await Promise.all(fretes.map(f => enrichFrete(f, headers)));

  // Salva no cache por 1 minuto
  const ids = enriched.map(f => f.id_frete).join(", ");
  await redis.set(cacheKey, JSON.stringify(enriched), "EX", 60 * 1);
  console.log(`[CACHE SET] ${cacheKey} - IDs cacheados por expiração: [${ids}]`);

  return enriched;
}

/*
* DESCRIÇÃO: Serviço para obter um frete pelo seu ID.
*/
export async function getFreteByIdService(id: number, auth?: string) {
  const headers = buildHeaders(auth);
  const frete = await Frete.findByPk(id, {
    include: [{
      model: Status, as: "status",
      required: false
    }],
  });
  if (!frete) throw new AppError(404, "Frete não encontrado");
  return enrichFrete(frete, headers);
}

/*
* DESCRIÇÃO: Serviço para listar fretes por caminhoneiro.
*/
export async function listFretesByCaminhoneiroService(caminhoneiroId: number, auth?: string) {
  const headers = buildHeaders(auth);
  const frete = await Frete.findOne({
    where: { caminhoneiro_id: caminhoneiroId },
    include: [{
      model: Status, as: "status",
      required: false
    }],
  });
  if (!frete) return null;
  return enrichFrete(frete, headers);
}

/*
* DESCRIÇÃO: Serviço para atualizar um frete pelo seu ID.
*/
export async function updateFreteService(id: number, payload: any, auth?: string) {
  const headers = buildHeaders(auth);
  const data = normalizeFretePayload(payload);

  if (data.caminhoneiro_id !== undefined && data.caminhoneiro_id !== null) {
    await ensureCaminhoneiroExists(data.caminhoneiro_id, headers);
  }

  if (data.empresa_id !== undefined) await ensureEmpresaExists(data.empresa_id, headers);
  if (data.carga_id !== undefined) await ensureCargaExists(data.carga_id, headers);

  const frete = await Frete.findByPk(id);
  if (!frete) throw new AppError(404, "Frete não encontrado");
  await frete.update(data);

  // Invalida o cache da lista após update
  await redis.del("fretes:list");
  console.log(`[CACHE DEL] fretes:list - Cache da lista invalidado por UPDATE`);

  // Atualiza o cache da lista e loga os IDs
  const fretes = await Frete.findAll();
  const enriched = await Promise.all(fretes.map(f => enrichFrete(f, headers)));
  const ids = enriched.map(f => f.id_frete).join(", ");
  await redis.set("fretes:list", JSON.stringify(enriched), "EX", 60 * 1);
  console.log(`[CACHE SET] fretes:list - IDs cacheados por UPDATE: [${ids}]`);

  return enrichFrete(frete, headers);
}


export async function deleteFreteService(id: number) {
  const frete = await Frete.findByPk(id);
  if (!frete) throw new AppError(404, "Frete não encontrado");
  await frete.destroy();
}