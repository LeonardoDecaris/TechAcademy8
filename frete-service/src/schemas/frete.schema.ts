// filepath: c:\Users\Leonardo Decaris\Documents\Faculdade\1_TechAcademys\TechAcademy8\frete-service\src\schemas\frete.schema.ts
import { z } from "zod";

export const createFreteSchema = z.object({
  descricao: z.string().min(1),
  origem: z.string().min(1),
  destino: z.string().min(1),
  distanciaDestino: z.number().positive(),
  prazo: z.string().min(1),
  status_id: z.number().int(),
  empresa_id: z.number().int().optional(),
  carga_id: z.number().int(),
  caminhoneiro_id: z.number().int(),
});

export const updateFreteSchema = createFreteSchema.partial();