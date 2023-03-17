const express = require("express");

const tempyhumeCtrl = require("../controllers/tempyhume");

const router = express.Router();

router.get("/", tempyhumeCtrl.findAllData);

router.get("/:id", tempyhumeCtrl.findOneData);

module.exports = router;
