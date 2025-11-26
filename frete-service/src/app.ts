import express from "express";
import cors from "cors";
import fretesRouter from "./routes/fretes.routes";
import statusRouter from "./routes/status.routes";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authMiddleware);

app.use("/fretes", fretesRouter);
app.use("/status", statusRouter);

export default app;