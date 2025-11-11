import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Cargo extends Model {}

Cargo.init(
  {
    id_carga: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tipo_carga_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "CARGA",
    timestamps: false,
  }
);

export default Cargo;