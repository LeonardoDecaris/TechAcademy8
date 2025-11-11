import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class CargoImage extends Model {}

CargoImage.init(
  {
    id_imagemCarga: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carga_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "IMAGEM_CARGA",
    timestamps: false,
  }
);

export default CargoImage;