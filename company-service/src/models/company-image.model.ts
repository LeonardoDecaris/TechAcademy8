import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class CompanyImage extends Model {}

CompanyImage.init(
  {
    id_imagemEmpresa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "IMAGEM_EMPRESA",
    timestamps: false,
  }
);

export default CompanyImage;