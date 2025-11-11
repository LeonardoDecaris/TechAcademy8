import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class CargoType extends Model {}

CargoType.init(
  {
    id_tipoCarga: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "TIPO_CARGA",
    timestamps: false,
  }
);

export default CargoType;