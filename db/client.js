const { Client } = require("pg");

//const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/Capstone';
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:Aa19525295$@localhost:5432/Capstone";

const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
