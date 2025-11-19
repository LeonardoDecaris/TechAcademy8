import { Sequelize } from "sequelize";

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME
} = process.env;

export default new Sequelize(DB_NAME!, DB_USER!, DB_PASS!, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "mysql",
  logging: false,
  retry: { max: 5 }
});
