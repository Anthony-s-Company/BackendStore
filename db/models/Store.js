const client = require("../client");

// drop tables for Capstone Store
async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
      DROP TABLE IF EXISTS "category";
    `);
  } catch (error) {
    throw error;
  }
}

// build tables for Capstone Store
async function createTables() {
  try {
    console.log("Building All Tables...");
    await client.query(`
      CREATE TABLE "category" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
        );
    `);
  } catch (error) {
    throw error;
  }
}

// build all tables
async function createDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createDB,
  client,
};
