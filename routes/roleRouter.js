const roleController = require("../controllers/roleController.js");

const router = require("express").Router();

router.post("/addRole", roleController.addRole);
router.get("/allRoles", roleController.getAllRoles);
router.get("/:id", roleController.getOneRole);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

module.exports = router;
