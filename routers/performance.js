const express = require("express");
const router = express.Router();

const performanceController = require("../controllers/performance");

// athorized user will create performace for a user.
router.post("/create", performanceController.create);
// admin updating the performance data.
router.post("/:id/update", performanceController.update);
//admin will delete it
router.get("/:id/delete", performanceController.delete);

module.exports = router;
