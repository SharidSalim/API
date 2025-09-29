const express = require("express");
const router = express.Router();
const userSchema = require("../../models/userSchema");
const { mail } = require("../../modules/emailHandler");
const otpGenerator = require("otp-generator");
router.post("/otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await userSchema.findOne({
      email,
    });
    if (otp === user.otp) {
      user.otpVerification = true;
      user.otp = undefined;
      await user.save();
      return res.sendStatus(200);
    } else return res.sendStatus(401);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.put("/otp", (req, res) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  const { email } = req.body;
  const user = userSchema.findOne({ email });
  if (!user.otpVerification) {
    user.otp = otp;
    user.save();
    res.sendStatus(200);
    mail(email, `<p>Your OTP code is <mark>${otp}</mark></p>`);
  }
});

module.exports = router;
