const skillController = require("../controllers/skillController");

const router = require("express").Router();

// router.post("/addUser", skillController.addUser)
router.get("/allSkills", skillController.getAllSkills);
router.get("/:id", skillController.getOneSkill);
router.post("/addSkill", skillController.createSkill);
router.put("/:id", skillController.updateSkill);
router.delete("/:id", skillController.deleteSkill);

module.exports = router;
