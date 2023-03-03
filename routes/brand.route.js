const express = require("express");

const router = express.Router();
const brand = require("../controllers/brand.controller.js");

router.get("/brand", brand.getAll);
router.get("/brand/:id", brand.getOne);
router.post("/brand", brand.create);
router.delete("/brand/:id", brand.delete);
router.put("/brand/:id", brand.update);

module.exports = router;
