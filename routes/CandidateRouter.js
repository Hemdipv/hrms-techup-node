const candidateController = require("../controllers/candidateController");
const router = require("express").Router();

// multer settings for files upload
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/candidate`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
  { name: "candidatePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "aadhaar", maxCount: 1 },
  { name: "salarySlip", maxCount: 1 },
  { name: "experienceLetter", maxCount: 1 },
  { name: "marksheet", maxCount: 1 },
  { name: "companyofferletter", maxCount: 1 },
]);

// api routes
// router.post("/addCandidate", candidateController.addCandidate)
router.post("/addCandidate", cpUpload, candidateController.addCandidate);
// router.post("/addCandidate", upload.single("candidatePhoto"), candidateController.addCandidate)
router.get("/allCandidates", candidateController.getAllCandidates);
router.get("/:id", candidateController.getOneCandidate);
router.put("/:id", cpUpload, candidateController.updateCandidate);
router.post("/:id", candidateController.deleteCandidate);
router.get("/candidate-status/:id", candidateController.getCandidateStatus);
router.put(
  "/update-candidate-status/update",
  candidateController.updateCandidateStatus
);
router.post("/update/update-remark", candidateController.updateRemark);
router.get("/remark/:id", candidateController.getRemark);

router.post("/verify/verify-candidate", candidateController.VerifyCandidate);

module.exports = router;
