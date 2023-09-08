const client = require("./client");
const { products, categories } = require("./data");

// drop tables for video games and board games
async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
      DROP TABLE IF EXISTS User;
      DROP TABLE IF EXISTS Category;
      DROP TABLE IF EXISTS Product;
      DROP TABLE IF EXISTS Item;
      DROP TABLE IF EXISTS Order;
    `);
  } catch (error) {
    throw error;
  }
}

// build tables for video games and board games
async function createTables() {
  try {
    console.log("Building All Tables...");
    await client.query(`

        CREATE TABLE user (
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

        CREATE TABLE category (
          id SERIAL PRIMARY KEY,
          product_id INTEGER NOT NULL,
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT
          );

        CREATE TABLE product (
          id SERIAL PRIMARY KEY,
          category_id INTEGER NOT NULL,
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          imgUrl VARCHAR(255) DEFAULT 'https://i.imgur.com/rS1Nzax.png',
          stock INTEGER,
          price FLOAT,
          vendor VARCHAR(255)
          );

        CREATE TABLE item (
          id SERIAL PRIMARY KEY,
          product_id INTEGER NOT NULL,
          qty INTEGER,
          price FLOAT
          );

        CREATE TABLE order (
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

// create initial data for video games and board games
async function createInitialData() {
  try {
    console.log("Creating Initial Data...");
    await client.query(`
      INSERT INTO product (category_id, name, description, imgUrl, stock, price, vendor)
      VALUES
      ${products
        .map(
          (product) => `(${product.category_id}, ${product.name}, 
                            ${product.description}, ${product.imgUrl}, 
                            ${product.stock}, ${product.price}, ${product.vendor})`
        )
        .join(",")}
      `);

    await client.query(`
      INSERT INTO category (product_id, name, description)
      VALUES
      ${categories
        .map(
          (category) =>
            `(${category.product_id}, ${category.name}, ${category.description})`
        )
        .join(",")}
      `);
  } catch (error) {
    throw error;
  }
}

// build all tables and create initial data
async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
