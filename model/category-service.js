const pool = require("../config/mysql-config.js");

exports.getCategories = async (limit) => {
  try {
    if (limit) {
      const [rows] = await pool.query(
        `SELECT * FROM category ORDER BY categoryId DESC LIMIT  ${limit}`
      );
      console.log(rows);
      return rows;
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getOne = async (id) => {
  try {
    const [row] = await pool.query(
      `SELECT * FROM category where categoryId = ${id}`
    );
    return row[0];
  } catch (err) {
    console.log(err);
  }
};

exports.createCategory = async (cat) => {
  const { categoryName } = cat;

  //this question marks are similar with C language => printf('%d %d', x,y)
  const [result] = await pool.query(`INSERT INTO category VALUES (?, ?, ?)`, [
    null,
    categoryName,
    null,
  ]);

  return result;
};
exports.updateCategory = async (CategoryId, updatedData) => {
  console.log(updatedData);
  let [result] = "";
  for (let i = 0; i < Object.keys(updatedData).length; i++) {
    result = await pool.query(
      `UPDATE category SET ${Object.keys(updatedData)[i]} = '${
        Object.values(updatedData)[i]
      }' WHERE categoryId = ${CategoryId}`
    );
  }
  return result;
};
exports.deleteCategory = async (CategoryId) => {
  const [result] = await pool.query(
    `DELETE FROM category WHERE categoryId= ${CategoryId}`
  );
  return result;
};
