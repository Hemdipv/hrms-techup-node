const leaveController = require("../controllers/leaveController.js");
const router = require("express").Router();

router.post("/addLeave", leaveController.addLeave);
router.get("/allLeaves", leaveController.getAllLeaves);
router.get("/:id", leaveController.getOneLeaveDetails);
router.put("/updateLeave/:id", leaveController.updateLeave); 
router.delete("/deleteLeave/:id", leaveController.deleteLeave); 
router.post('/update-leave-status', leaveController.updateLeaveStatus);


module.exports = router;
