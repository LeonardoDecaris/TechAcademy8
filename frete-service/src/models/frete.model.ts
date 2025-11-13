import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Status from "./status.model";

class Frete extends Model {}

Frete.init(
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
    caminhoneiro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    empresa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    carga_id: {
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

Frete.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });

export default Frete;