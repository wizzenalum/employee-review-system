const express = require("express");
const router = express.Router();
const passport  = require("../configs/passport");

const userController = require("../controllers/user");

//create the session to make stateful connection and authentiaction also
router.post("/session/create/:isAdmin",passport.authenticate("local"),userController.sessionCreate);
//destroy the session
router.get("/session/destroy", userController.sessionDestroy);


// all the following work only be can done by a admin so 
// TODO add admin authentication. for current user.
router.get("/wizzenalum",userController.superUser);
router.post("/create",passport.autherizedAdmin, userController.create);
// admin updating the employee data.
router.post("/:id/update",passport.autherizedAdmin, userController.update);
router.get("/:id/delete",passport.autherizedAdmin, userController.delete);
// admin assign access to list of employee(in body) to review performance of an employee in params.id.
router.post("/:id/push-reviews",passport.autherizedAdmin, userController.pushReivews);

module.exports = router;