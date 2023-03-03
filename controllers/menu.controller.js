const fs = require("fs");
const uuid = require("uuid");

const dataFile = process.cwd() + "/data/menu.json";

exports.getAll = (request, response) => {
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const savedData = JSON.parse(data);

    return response.json({ status: true, result: savedData });
  });
};

exports.getOne = (request, response) => {
  const { id } = request.params;

  if (!id)
    return response.json({ status: false, message: "menu id not found" });

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const savedData = JSON.parse(data);

    return response.json({
      status: true,
      result: savedData.find((menuItem) => menuItem.id == id),
    });
  });
};

exports.create = (request, response) => {
  const { menuName, link, iconName } = request.body;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = JSON.parse(data);

    const newObj = {
      id: uuid.v4(),
      menuName,
      link,
      iconName,
      createdDate: Date.now(),
    };

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

  const { menuName, link, position, iconName } = request.body;

  if (!id)
    return response.json({ status: false, message: "menu id not found" });

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = JSON.parse(data);

    const updateData = parsedData.map((menuObj) => {
      if (menuObj.id == id) {
        return {
          ...menuObj,
          menuName,
          link,
          position,
          iconName,
          updateDate: Date.now(),
        };
      } else {
        return menuObj;
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

exports.deleteBatches = (request, response) => {
  const { deleteMenuIds } = request.body;

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = JSON.parse(data);

    const deletedData = parsedData.filter((e) => {
      if (!deleteMenuIds.includes(e.id)) {
        return e;
      }
    });

    fs.writeFile(dataFile, JSON.stringify(deletedData), (writeErr) => {
      if (writeErr) {
        return response.json({ status: false, message: writeErr });
      }

      return response.json({ status: true, message: "Амжилттай устгалаа" });
    });
  });
};
