const pool = require("../config/mysql-config.js");

exports.getProducts = async (limit) => {
  try {
    if (limit) {
      const [rows] = await pool.query(
        `SELECT * FROM product ORDER BY productId DESC LIMIT  ${limit}`
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
      `SELECT * FROM product where productId = ${id}`
    );
    return row[0];
  } catch (err) {
    console.log(err);
  }
};

exports.getLastOne = async () => {
  try {
    const [row] = await pool.query(
      `SELECT * FROM product  order by productId DESC LIMIT 1`
    );
    return row[0];
  } catch (err) {
    console.log(err);
  }
};

exports.createProduct = async (pro) => {
  // const { categoryName } = cat;

  const {
    productName,
    categoryId,
    price,
    thumbImage,
    quantityInStock,
    salePercent,
    brandId,
    descriptions,
    saleFinishDate,
  } = pro;

  //this question marks are similar with C language => printf('%d %d', x,y)
  const [result] = await pool.query(
    `INSERT INTO product VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      null,
      categoryId,
      price,
      productName,
      quantityInStock,
      thumbImage,
      brandId,
      descriptions,
      salePercent,
      saleFinishDate,
      null,
    ]
  );

  return result;
};

exports.createProductImage = async (productId, images) => {
  // const { productId, images } = pro;

  //this question marks are similar with C language => printf('%d %d', x,y)

  const A = [];
  for (let i = 0; i < images.length; i++) {
    const [result] = await pool.query(
      `INSERT INTO productImages VALUES (?, ?, ?, ?)`,
      [null, productId, images[i], null]
    );
    console.log(result);
  }

  return "Success";
};

exports.getProductImages = async (productId) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM productImages where productId = ${productId} ORDER BY productId DESC`
    );
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

exports.updateProduct = async (ProductId, updatedData) => {
  console.log(updatedData);
  let [result] = "";
  for (let i = 0; i < Object.keys(updatedData).length; i++) {
    result = await pool.query(
      `UPDATE product SET ${Object.keys(updatedData)[i]} = '${
        Object.values(updatedData)[i]
      }' WHERE productId = ${ProductId}`
    );
  }
  return result;
};
exports.deletePro = async (ProductId) => {
  const [result] = await pool.query(
    `DELETE FROM product WHERE productId= ${ProductId}`
  );
  return result;
};
