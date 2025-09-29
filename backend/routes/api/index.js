const express = require("express");
const router = express.Router();
const regRoute = require("./regHandler");
const logRoute = require("./loginHandler");
const otpRoute = require("./otpVer");
const dataRoute = require("./members");

router.use("/", regRoute, logRoute, otpRoute, dataRoute);

module.exports = router;
