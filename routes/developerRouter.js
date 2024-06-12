const developerController = require("../controllers/developerController");

const router = require("express").Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/developer`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.single("document");

router.post("/create", cpUpload, developerController.addDeveloper);

module.exports = router;
