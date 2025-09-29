const nodemailer = require("nodemailer")
async function mail(receiver, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sharidsalim@gmail.com",
      pass: process.env.APP_PASS,
    },
  });
  var message = {
    from: "Sharid Salim <sharidsalim@gmail.com>",
    to: receiver,
    subject: "OTP Code",
    html: html,
  };
  try {
    const info = await transporter.sendMail(message);
    console.log("Email sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

module.exports = { mail };
