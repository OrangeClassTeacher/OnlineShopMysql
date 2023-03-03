const fs = require("fs");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 3;
const myKey = "1234!@#$";

const userModel = require("../model/user-service");

const dataFile = process.cwd() + "/data/user.json";
//id, firstname, lastname, username, password, email, password, favoriteProducs: ["",""], mostViewProducts:["",""], lastLoginDate

exports.getAll = async (request, response) => {
  try {
    const [result] = await userModel.getUsers();
    if (result.length > 0) {
      return response.json({ status: true, result });
    }
  } catch (err) {
    return response.json({ status: false, message: err });
  }

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const savedData = data ? JSON.parse(data) : [];

    return response.json({ status: true, result: savedData });
  });
};

exports.getOne = (request, response) => {
  const { id } = request.params;

  if (!id)
    return response.json({ status: false, message: "user id not found" });

  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const savedData = data ? JSON.parse(data) : [];

    return response.json({
      status: true,
      result: savedData.find((userItem) => userItem.id == id),
    });
  });
};

exports.create = (request, response) => {
  const { firstname, lastname, username, password, email } = request.body;
  fs.readFile(dataFile, "utf-8", async (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];

    const newPassword = await bcrypt.hash(password + myKey, saltRounds);

    console.log(newPassword);

    const newObj = {
      id: uuid.v4(),
      firstname,
      lastname,
      username,
      password: newPassword,
      email,
      favoriteProducs: [],
      mostViewProducts: [],
      createdDate: Date.now(),
    };

    parsedData.push(newObj);

    fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) => {
      if (writeErr) {
        return response.json({ status: false, message: writeErr });
      }

      return response.json({
        status: true,
        message: "Амжилттай нэмэгдлээ.",
        result: newObj,
      });
    });
  });
};

exports.update = (request, response) => {
  const { id } = request.params;
  if (!id)
    return response.json({ status: false, message: "user id not found" });

  const {
    firstname,
    lastname,
    username,
    password,
    email,
    favoriteProducs,
    mostViewProducts,
    lastLoginDate,
  } = request.body;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = JSON.parse(data);

    const updateData = parsedData.map((cateObj) => {
      if (cateObj.id == id) {
        return {
          ...cateObj,
          firstname,
          lastname,
          username,
          password,
          email,
          favoriteProducs,
          mostViewProducts,
          lastLoginDate,
          updatedDate: Date.now(),
        };
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
    return response.json({ status: false, message: "user id not found" });

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

exports.login = (request, response) => {
  const { email, password } = request.body;

  if (!email || !password)
    return response.json({
      status: false,
      message: "medeellee buren buglunu uu",
    });

  fs.readFile(dataFile, "utf-8", async (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];
    let user;
    for (let i = 0; i < parsedData.length; i++) {
      if (email == parsedData[i].email) {
        const decrypt = await bcrypt.compare(
          password + myKey,
          parsedData[i].password
        );

        if (decrypt) {
          user = {
            id: parsedData[i].id,
            email: parsedData[i].email,
            lastname: parsedData[i].lastname,
            firstname: parsedData[i].firstname,
          };
          break;
        }
      }
    }

    console.log(user);

    if (user) {
      return response.json({
        status: true,
        result: user,
      });
    } else {
      return response.json({
        status: false,
        message: "Tanii email eswel nuuts ug buruu bna",
      });
    }
  });
};
