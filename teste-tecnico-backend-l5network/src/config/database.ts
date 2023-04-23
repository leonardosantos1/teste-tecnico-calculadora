import * as dotenv from "dotenv";
dotenv.config()
import { knex as setupKnex, Knex } from "knex";

console.log("HOST " + process.env.MYSQL_HOST);
console.log("MYSQL_ROOT_PASSWORD " + process.env.MYSQL_ROOT_PASSWORD);
console.log("DATABASE " + process.env.MYSQL_DATABASE);
console.log("PORTS " + process.env.MYSQL_PORTS);

export const configKnex: Knex.Config = {
  client: "mysql",
  connection: {
    port: parseInt(process.env.MYSQL_PORTS),
    host: process.env.MYSQL_HOST,
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./src/migrations",
  },
};

export const knex = setupKnex(configKnex);
