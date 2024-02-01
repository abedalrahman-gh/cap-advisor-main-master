const express = require("express");
const router = express.Router();
const usergradepController = require("../controllers/usergradepController");

router.get("/", usergradepController.getusergradepPage);
router.post("/", usergradepController.posusergradepPage);

module.exports = router;
