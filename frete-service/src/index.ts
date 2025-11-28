import sequelize from "./config/database";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
if (!PORT) {
  console.error("PORT não está definido nas variáveis de ambiente");
  process.exit(1);
}

import { startFreteStatusWorker } from "./workers/freteStatus.worker";
import "./config/redisClient";

async function waitForDb(retries = 10, delayMs = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("DB ready");
      return;
    } catch (e) {
      console.log(`DB not ready (tentativa ${i}/${retries})`);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new Error("DB indisponível após várias tentativas");
}

(async () => {
  try {
    await waitForDb();
    await sequelize.sync();
    console.log("Frete-Service Database synchronized");
    const app = (await import("./app")).default;
    const port = process.env.PORT;
    app.listen(port, () => console.log(`Frete-Service Server is running on port ${PORT}`));
  } catch (e:any) {
    console.error("Startup error:", e.message);
    process.exit(1);
  }
})();

if (process.env.ENABLE_WORKERS === "true") {
  startFreteStatusWorker();
}