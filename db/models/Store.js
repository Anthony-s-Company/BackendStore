const client = require("../client");

// drop tables for Capstone Store
async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
      DROP TABLE IF EXISTS "user";
      DROP TABLE IF EXISTS "category";
      DROP TABLE IF EXISTS "product";
      DROP TABLE IF EXISTS "item";
      DROP TABLE IF EXISTS "order";
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
      CREATE TABLE "user" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        lastname VARCHAR(255),
        address1 VARCHAR(255),
        address2 VARCHAR(255),
        city VARCHAR(50),
        state VARCHAR(50),
        zip VARCHAR(25),
        county VARCHAR(50),
        active BOOLEAN DEFAULT true,
        "imgUrl" VARCHAR(255) DEFAULT 'https://i.imgur.com/An7G9J1b.jpg'
        );

      CREATE TABLE "category" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT
        );

      CREATE TABLE "product" (
        id SERIAL PRIMARY KEY,
        category_id INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        imgUrl VARCHAR(255) DEFAULT 'https://i.imgur.com/rS1Nzax.png',
        stock INTEGER,
        price FLOAT,
        vendor VARCHAR(255)
        );

      CREATE TABLE "item" (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL,
        qty INTEGER,
        price FLOAT
        );

      CREATE TABLE "order" (
        id SERIAL PRIMARY KEY,
        item_id INTEGER NOT NULL,
        status VARCHAR(50),
        total FLOAT
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
