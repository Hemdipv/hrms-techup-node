const express = require("express");
const router = express.Router();
const developerCVController = require("../controllers/developerCVController");
router.post("/create-pdf", developerCVController.postCreateCV);

module.exports = router;
