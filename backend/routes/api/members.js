const express = require("express");
const router = express.Router();
const userSchema = require("../../models/userSchema");
router.get("/members", async (req, res) => {
  const data = await userSchema.find();
  res.send(data);
});

module.exports = router;
