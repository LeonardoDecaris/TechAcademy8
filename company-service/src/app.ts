import express from "express";
import cors from "cors";
import companyRoutes from "./routes/company.routes";
import companyImageRoutes from "./routes/company-image.routes";
import sequelize from "./config/database";

sequelize.authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/empresas", companyRoutes);
app.use("/imagens-empresa", companyImageRoutes);

// Healthcheck
app.get("/health", (req, res) => res.send("ok"));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Company service running on port ${PORT}`);
});