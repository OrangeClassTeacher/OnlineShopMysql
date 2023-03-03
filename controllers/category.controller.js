const fs = require("fs");
const uuid = require("uuid");

const dataFile = process.cwd() + "/data/category.json";
//id, categoryName, icon

exports.getAll = (request, response) => {
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const savedData = data ? JSON.parse(data) : [];

    return response.json({ status: true, result: savedData });
  });
};

exports.getOne = (request, response) => {
  const { id } = request.body;
  if (!id)
    return response.json({ status: false, message: "category id not found" });

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const savedData = JSON.parse(data);

    return response.json({
      status: true,
      result: savedData.find((cateItem) => cateItem.id == id),
    });
  });
};

exports.create = (request, response) => {
  const { categoryName } = request.body;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];

    const newObj = { id: uuid.v4(), categoryName };

    parsedData.push(newObj);

    fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) => {
      if (writeErr) {
        return response.json({ status: false, message: writeErr });
      }

      return response.json({
        status: true,
        message: "Амжилттай нэмэгдлээ",
        result: newObj,
      });
    });
  });
};

exports.update = (request, response) => {
  const { id } = request.params;
  const { categoryName } = request.body;

  if (!id)
    return response.json({ status: false, message: "category id not found" });

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];

    const updateData = parsedData.map((cateObj) => {
      if (cateObj.id == id) {
        return { ...cateObj, categoryName };
      } else {
        return cateObj;
      }
    });

    fs.writeFile(dataFile, JSON.stringify(updateData), (writeErr) => {
      if (writeErr) {
        return response.json({ status: false, message: writeErr });
      }

      return response.json({ status: true, message: "Амжилттай засагдлаа" });
    });
  });
};

exports.delete = (request, response) => {
  const { id } = request.params;

  if (!id)
    return response.json({ status: false, message: "category id not found" });

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = JSON.parse(data);

    const deletedData = parsedData.filter((e) => e.id != id);

    fs.writeFile(dataFile, JSON.stringify(deletedData), (writeErr) => {
      if (writeErr) {
        return response.json({ status: false, message: writeErr });
      }

      return response.json({ status: true, message: "Амжилттай устгалаа" });
    });
  });
};
