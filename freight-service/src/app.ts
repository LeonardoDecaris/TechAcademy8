import express from "express";
import cors from "cors";
import freightRoutes from "./routes/freight.routes";
import statusRoutes from "./routes/status.routes";
import sequelize from "./config/database";

sequelize.authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/fretes", freightRoutes);
app.use("/status", statusRoutes);

// Healthcheck
app.get("/health", (req, res) => res.send("ok"));

// ...rotas de frete virão aqui...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Freight service running on port ${PORT}`);
});