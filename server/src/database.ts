import { Knex } from "knex";

const knex: Knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "pocket",
  },
});

export default knex;
