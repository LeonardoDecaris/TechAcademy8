import client from "../utils/monolithClient";
import AppError from "../utils/AppError";

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

const PATHS = {
  carga: process.env.MONOLITH_CARGAS_PATH,
  empresa: process.env.MONOLITH_EMPRESAS_PATH,
  caminhoneiro: process.env.MONOLITH_CAMINHONEIROS_PATH,
};

type Headers = Record<string, string> | undefined;

async function exists(path: string, id: number, headers: Headers) {
  try {
    const r = await client.get(`${path}/${id}`, { headers });
    return r.status === 200;
  } catch (e: any) {
    if (e?.response?.status === 404) return false;
    throw new AppError(502, `Falha ao consultar ${path}/${id}`);
  }
}

export async function ensureCaminhoneiroExists(id?: number | null, headers?: Headers) {
  if (id == null) return;
  if (!(await exists(PATHS.caminhoneiro, id, headers))) {
    throw new AppError(404, "Caminhoneiro não encontrado");
  }
}

export async function ensureEmpresaExists(id?: number, headers?: Headers) {
  if (id == null) return;
  if (!(await exists(PATHS.empresa, id, headers))) {
    throw new AppError(404, "Empresa não encontrada");
  }
}

export async function ensureCargaExists(id?: number, headers?: Headers) {
  if (id == null) return;
  if (!(await exists(PATHS.carga, id, headers))) {
    throw new AppError(404, "Carga não encontrada");
  }
}