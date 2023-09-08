const client = require("./client");
const util = require("util");

// GET - /api/products - get all products
async function getAllProducts() {
  try {
    const { rows } = await client.query(`
            SELECT * FROM product;
        `);
    return rows;
  } catch (err) {
    throw err;
  }
}

// GET - /api/products/:id - get a single product by id
async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT * FROM product
        WHERE id = $1;
        `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

// POST - /api/products - create a new product
async function createProduct(body) {
  const { category_id, name, description, imgUrl, stock, price, vendor } = body;
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO product(category_id, name, description, imgUrl, stock, price, vendor)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,
      [category_id, name, description, imgUrl, stock, price, vendor]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/products/:id - update a single product by id
async function updateProduct(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        UPDATE product
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return product;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/products/:id - delete a single product by id
async function deleteProduct(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        DELETE FROM product
        WHERE id=${id}
        RETURNING *;
        `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
