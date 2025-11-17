import { z } from "zod";

export const baseFreteSchema = z.object({
  saida: z.string().optional(),
  destino: z.string().optional(),
  valor_frete: z.number().optional(),
  data_saida: z.union([z.date(), z.string().datetime()]).transform(v => typeof v === "string" ? new Date(v) : v).nullable().optional(),
  data_chegada: z.union([z.date(), z.string().datetime()]).transform(v => typeof v === "string" ? new Date(v) : v).nullable().optional(),
  prazo: z.number().optional(),
  distancia: z.number().optional(),
  status_id: z.number().int().optional(),
  empresa_id: z.number().int().optional(),
  carga_id: z.number().int().optional(),
  caminhoneiro_id: z.number().int().nullable().optional(),
}).strict();

export const updateFreteSchema = baseFreteSchema;
export const createFreteSchema = baseFreteSchema;

export type FreteInput = z.infer<typeof baseFreteSchema>;