import { knex as setupKnex, Knex } from "knex";

export const configKnex: Knex.Config = {
  client: "mysql",
  connection: {
    port:3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "calculator-test",
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./src/migrations",
  },
};

export const knex = setupKnex(configKnex);
