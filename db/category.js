const client = require("./client");

// GET - /api/categories - get all categories
async function getAllCategories() {
  try {
    const { rows } = await client.query(`
            SELECT * FROM category;
        `);
    return rows;
  } catch (err) {
    throw err;
  }
}

// GET - /api/categories/:id - get a single category by id
async function getCategoryById(id) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        SELECT * FROM category
        WHERE id = $1;
        `,
      [id]
    );
    return category;
  } catch (error) {
    throw error;
  }
}

// POST - /api/categories - create a new category
async function createCategory(body) {
  const { name, description } = body;
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        INSERT INTO category(name, description)
        VALUES($1, $2)
        RETURNING *;
        `,
      [name, description]
    );
    return category;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/categories/:id - update a single category by id
async function updateCategory(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        UPDATE category
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return category;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/categories/:id - delete a single category by id
async function deleteCategory(id) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        DELETE FROM category
        WHERE id=${id}
        RETURNING *;
        `,
      [id]
    );
    return category;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
