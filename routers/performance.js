const express = require("express");
const router = express.Router();
const passport = require('passport')
const performanceController = require("../controllers/performance");

// athorized user will create performace for a user.
router.post("/create",passport.autherizedUser, performanceController.create);
// admin updating the performance data.
router.post("/:id/update",passport.autherizedUser, performanceController.update);
//admin will delete it
router.get("/:id/delete",passport.autherizedUser, performanceController.delete);

module.exports = router;
