const express = require("express");
const router = express.Router();
const userSchema = require("../../models/userSchema");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { password: hash, otpVerification } = await userSchema.findOne({
      email,
    });

    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        if (!otpVerification) {
          return res.sendStatus(401);
        } else return res.sendStatus(200)
      } else {
        return res.status(401).send("Incorrect password");
      }
    });
  } catch (err) {
    return res.sendStatus(404);
  }
});

module.exports = router;
