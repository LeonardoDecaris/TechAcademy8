import app from './app';
import sequelize from "./config/database";
import Status from "./models/status.model";
import Frete from "./models/frete.model";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

import { startFreteStatusWorker } from "./workers/freteStatus.worker";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Frete-Service Database authenticated");
    await sequelize.sync();
    console.log("Frete-Service Database synchronized");
    const app = (await import("./app")).default;
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Frete-Service Server is running on port ${PORT}`));
  } catch (e:any) {
    console.error("Startup error:", e.message);
    process.exit(1);
  }
})();

if (process.env.ENABLE_WORKERS === "true") {
  startFreteStatusWorker();
}