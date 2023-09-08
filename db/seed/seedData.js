const client = require("../client");
const { products, categories } = require("./data");
const db = require('../models/Store')

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
    await db.createDB()
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
