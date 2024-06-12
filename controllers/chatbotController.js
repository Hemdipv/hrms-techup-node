const db = require("../models");
var fs = require("fs");
const { Op } = require("sequelize");

const ChatbotModel = db.chatbot;

exports.addChatbotData = async (req, res) => {
  try {
    const data = await ChatbotModel.create(req.body);

    res.status(200).json({
      message: "Thank you for contacting us",
      success: true,
      data: data,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).send({
      flag: false,
      message: "Something went wrong",
      error,
    });
    return;
  }
};
