const express = require("express");

const router = express.Router();
const menu = require("../controllers/menu.controller.js");

router.get("/menu", menu.getAll);
router.get("/menu/:id", menu.getOne);
router.post("/menu", menu.create);
router.delete("/menu/:id", menu.delete);
router.put("/menu/:id", menu.update);
router.post("/menu/delete-batches-menu", menu.deleteBatches);

module.exports = router;
