// this is entry point for my all the routes and using the inbuild Router for routing
const express = require("express");
const passport = require("passport");
const router = express.Router();
const homeController = require("../controllers/home");

//these area the tree views that mostly look like this
router.get("/", homeController.home);
router.get("/admin",passport.autherizedUser, homeController.admin);
router.get("/admin/:id", passport.autherizedUser,homeController.employeeForAdmin);
router.get("/employee",passport.autherizedUser, homeController.employee);

// setting the path for the routes specific to individual model to add
// functionality of crud to most.
router.use("/user", require("./user"));
router.use("/performance", require("./performance"));
router.use("/feedback", require("./feedback"));
router.use("/request", require("./request"));

// // this will handle the get request that will not found in the system
// // thats why this is at the end
// router.get("/:id", homeController.error404);

module.exports = router;
