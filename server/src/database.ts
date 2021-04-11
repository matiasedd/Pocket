import { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const knex: Knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

export default knex;
