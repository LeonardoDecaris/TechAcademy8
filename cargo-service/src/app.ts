import express from "express";
import cors from "cors";
import cargoRoutes from "./routes/cargo.routes";
import cargoTypeRoutes from "./routes/cargo-type.routes";
import cargoImageRoutes from "./routes/cargo-image.routes";
import sequelize from "./config/database";

sequelize.authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/cargas", cargoRoutes);
app.use("/tipos-carga", cargoTypeRoutes);
app.use("/imagens-carga", cargoImageRoutes);

// Healthcheck
app.get("/health", (req, res) => res.send("ok"));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Cargo service running on port ${PORT}`);
});