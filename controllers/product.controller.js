const fs = require("fs");
const uuid = require("uuid");

const dataFile = process.cwd() + "/data/product.json";
// Id, product name, categoryId, price, thumbImage, images,
// salePercent, quantity, brandId, desc, createdDate,
// UpdateDate, CreatedUser, UpdatedUser

const proService = require("../model/product-service.js");

exports.getAll = async (req, res) => {
  const { limit } = req.query;
  try {
    const result = await proService.getProducts(limit);
    console.log(result);
    if (result.length > 0) {
      res.json({ status: true, result });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
};

exports.getOne = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.json({ status: false, message: "product not found" });
  try {
    const result = await proService.getOne(id);

    const resultImages = await proService.getProductImages(id);

    console.log(result);
    console.log(resultImages);

    const proObj = { ...result };
    proObj.images = resultImages;

    res.json({ status: true, result: proObj });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.create = async (req, res) => {
  const { images } = req.body;

  try {
    const result = await proService.createProduct(req.body);

    const resultProLast = await proService.getLastOne();
    console.log(resultProLast, "HAHa");

    const resultImg = await proService.createProductImage(
      resultProLast.productId,
      images
    );

    console.log(resultImg);

    res.json({ status: true, message: "Амжилттай нэмэгдлээ", result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.update = async (request, response) => {
  const { id } = request.params;
  const {
    productName,
    categoryId,
    price,
    thumbImage,
    images,
    salePercent,
    quantity,
    brandId,
    desc,
  } = request.body;

  if (!id)
    return response.json({ status: false, message: "product id not found" });

  try {
    const result = await proService.updateProduct(id, request.body);
    console.log(result);
    if (result.length > 0 && result[0].affectedRows > 0) {
      return response.json({ status: true, message: "Success" });
    } else {
      return response.json({ status: false, message: "Amjiltgui" });
    }
  } catch (err) {
    response.json({ status: false, message: err });
  }
};

exports.delete = async (req, res) => {
  const { id } = request.params;

  if (!id)
    return response.json({ status: false, message: "product id not found" });

  try {
    const result = await proService.deletePro(id);

    if (result && result[0].affectedRows > 0) {
      return res.json({ status: true, message: "Success" });
    } else {
      return res.json({ status: false, message: "Error" });
    }
  } catch (err) {
    res.json({ status: false, message: err });
  }
};
