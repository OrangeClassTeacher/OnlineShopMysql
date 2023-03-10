const fs = require("fs");
const uuid = require("uuid");

const dataFile = process.cwd() + "/data/category.json";
const cateService = require("../model/category-service.js");

//id, categoryName, icon

exports.getAll = async (req, res) => {
  const { limit } = req.query;
  try {
    const result = await cateService.getCategories(limit);
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
  if (!id) return res.json({ status: false, message: "cate not found" });
  try {
    const result = await cateService.getOne(id);

    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.create = async (req, res) => {
  // const { categoryName } = request.body;
  try {
    const result = await cateService.createCategory(req.body);

    res.json({ status: true, message: "Амжилттай нэмэгдлээ", result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.update = async (request, response) => {
  const { id } = request.params;
  // const { categoryName } = request.body;
  console.log(id);
  if (!id)
    return response.json({ status: false, message: "category id not found" });

  try {
    const result = await cateService.updateCategory(id, request.body);
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
  const { id } = req.params;
  if (!id) return res.json({ status: false, message: "Category not found" });
  try {
    const result = await cateService.deleteCategory(id);

    if (result && result[0].affectedRows > 0) {
      return res.json({ status: true, message: "Success" });
    } else {
      return res.json({ status: false, message: "Error" });
    }
  } catch (err) {
    res.json({ status: false, message: err });
  }
};
