const departmentController = require("../controllers/departmentController.js");

const router = require("express").Router();

router.post("/addDepartment", departmentController.addDepartment);
router.get("/allDepartments", departmentController.getAllDepartments);
router.get("/:id", departmentController.getOneDepartment);
router.put("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;
