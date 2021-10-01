const express = require("express");
const passport = require("passport");
const router = express.Router();

const requestController = require("../controllers/request");


router.post("/create", passport.autherizedUser,requestController.create);
router.post("/:id/delete", requestController.delete); 

module.exports = router;
