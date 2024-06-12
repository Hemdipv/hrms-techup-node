const db = require("../models");
var fs = require("fs");
const { Op } = require("sequelize");

const DeveloperModel = db.developer;

exports.addDeveloper = async (req, res) => {
  try {
    const image = req.file;

    const document = image.path.trim();
    const protocal = req.protocol;
    const hostname = req.headers.host; // hostname = 'localhost:8080'
    // const pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
    const baseUrl = protocal + "://" + hostname;
    const documentFile = baseUrl + "/" + document;
    if (!req?.file) {
      res.status(400).send({
        flag: false,
        message: "Something went wrong!",
      });
      return false;
    }
    const info = {
      ...req.body,
      document,
    };
    console.log("====================================");
    console.log(info);
    console.log("====================================");
    const data = await DeveloperModel.create(info);

    res.status(200).json({
      message: "Thank you for contacting us",
      success: true,
      data: data,
      file: documentFile,
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
