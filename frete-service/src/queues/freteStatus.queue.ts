import { Queue } from "bullmq";

const connection = { url: process.env.REDIS_URL || "redis://redis:6379" };

export const freteStatusQueue = new Queue("frete-status-approver", { connection });

export async function enqueuePendingToNaoIniciado(freteId: number, delayMs?: number) {
  const delay = Number(delayMs ?? process.env.FRETE_STATUS_DELAY_MS ?? 5000);
  console.log(`\n[Status Approver:] New Frete received:`, { freteId, delay });
  await freteStatusQueue.add(
    "approve-status",
    { freteId },
    { delay, attempts: 3, removeOnComplete: true, removeOnFail: 50 }
  );
}