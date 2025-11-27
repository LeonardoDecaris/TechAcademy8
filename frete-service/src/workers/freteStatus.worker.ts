import { Worker } from "bullmq";
import Frete from "../models/frete.model";
import sequelize from "../config/database";
import Status from "../models/status.model"; // <-- import

const connection = { url: process.env.REDIS_URL || "redis://redis:6379" };

export function startFreteStatusWorker() {

// Subscriber - Worker for frete status approval

  const worker = new Worker(
    "frete-status-approver",
    async (job) => {
      const { freteId } = job.data as { freteId: number };
      console.log(`[Status Approver:] Starting process to approve frete`, { freteId });
      const tx = await sequelize.transaction();
      try {
        const frete = await Frete.findByPk(freteId, { transaction: tx, lock: tx.LOCK.UPDATE });
        if (!frete) {
          console.log(`[Status Approver:] skip (frete not found)`, { freteId });
          await tx.rollback();
          return { freteId, status_id: null };
        }

        let status = frete.get("status_id") as number;
        console.log(`[Status Approver:] Current status`, { freteId, status });
        if (status === 1) {
            console.log(`[Status Approver:] Processing`, { freteId });
            await new Promise(r => setTimeout(r, 5000));
            await frete.update({ status_id: 2 }, { transaction: tx });
            status = 2;
        } else {
            console.log(`[Status Approver:] Skipped`, { freteId, status });
        }

        await tx.commit();
        return { freteId, status_id: status }; 
      } catch (e: any) {
        console.warn(`[Status Approver:] Error`, { freteId, message: e?.message });
        await tx.rollback();
        throw e;
      }
    },
    { connection }
  );

  worker.on("completed", async (job, returnValue) => {
    const sid = returnValue?.status_id;
    let descricao: string | null = null;
    if (sid) {
      const s = await Status.findByPk(sid);
      descricao = s ? (s.get("descricao") as string) : null;
    }
    console.log(`[Status Approver:] Completed`, {
      freteId: returnValue?.freteId,
      status_id: sid,
      status_descricao: descricao
    }, '\n');
  });

  worker.on("failed", (job, err) =>
    console.warn(`[Status Approver:] Failed`, {
      freteId: job?.data?.freteId,
      err: err?.message
    })
  );

  console.log(`Listening queue Status Approver`);
  return worker;
}