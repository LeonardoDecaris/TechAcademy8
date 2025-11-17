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
    saida: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    valor_frete: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    data_saida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data_chegada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    prazo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    distancia: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    caminhoneiro_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carga_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    empresa_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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