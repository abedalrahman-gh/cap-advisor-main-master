const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");

router.get("/", signupController.getSignupPage);
router.post("/", signupController.postSignupPage);

module.exports = router;
