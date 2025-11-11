import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Freight extends Model {}

Freight.init(
  {
    id_frete: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distanciaDestino: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    prazo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    empresaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cargaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "FRETE",
    timestamps: false,
  }
);

export default Freight;