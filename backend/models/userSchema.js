const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  otp: Number,
  otpVerification: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("users", userSchema);
