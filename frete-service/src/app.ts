import express from "express";
import cors from "cors";
import fretesRouter from "./routes/fretes.routes";
import statusRouter from "./routes/status.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/fretes", fretesRouter);
app.use("/status", statusRouter);

export default app;