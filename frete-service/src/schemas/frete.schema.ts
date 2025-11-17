import { z } from "zod";

export const baseFreteSchema = z.object({
  saida: z.string().optional(),
  destino: z.string().optional(),
  valor_frete: z.number().optional(),
  data_saida: z.date().optional().nullable(),
  data_chegada: z.date().optional().nullable(),
  prazo: z.number().optional(),
  distancia: z.number().optional(),
  status_id: z.number().int().optional(),
  empresa_id: z.number().int().optional(),
  carga_id: z.number().int().optional(),
  caminhoneiro_id: z.number().int().nullable().optional(),
}).strict();

export const updateFreteSchema = baseFreteSchema;
export const createFreteSchema = baseFreteSchema; // Se futuramente quiser campos obrigatórios, ajuste aqui.

export type FreteInput = z.infer<typeof baseFreteSchema>;