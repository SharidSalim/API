const express = require("express");
const router = express.Router();
const userSchema = require("../../models/userSchema");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const { mail } = require("../../modules/emailHandler");

router.post("/reg", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await userSchema.findOne({ email });
    if (result) {
      return res.sendStatus(302);
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        const otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });
        const user = new userSchema({
          username,
          email,
          password: hash,
          otp,
        });
        await user.save();
        mail(email, `<p>Your OTP code is <mark>${otp}</mark></p>`);
        res.sendStatus(200);
      });
    }
  } catch (err) {
    return res.sendStatus(400);
  }
});

module.exports = router;
