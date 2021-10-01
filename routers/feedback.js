const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedback");

// employee will create feedback for a performance
router.post("/create", feedbackController.create);
// employee updating the its data.
router.post("/:id/update", feedbackController.update);
//employee will delete it
router.get("/:id/delete", feedbackController.delete);

module.exports = router;
