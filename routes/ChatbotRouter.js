const chatbotController = require("../controllers/chatbotController");

const router = require("express").Router();

router.post("/create", chatbotController.addChatbotData);

module.exports = router;
