import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Company extends Model {}

Company.init(
  {
    id_empresa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avaliacao: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    localidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagemEmpresa_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "EMPRESA",
    timestamps: false,
  }
);

export default Company;