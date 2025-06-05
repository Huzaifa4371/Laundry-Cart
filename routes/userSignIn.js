const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("dotenv").config();
const user = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
JWT_SECRET = "random123"

const jwt_key = JWT_SECRET;

router.post("/user", async (req, res) => {
  try {
    const { user_email_phone, password } = req.body;
    if (!isNaN(user_email_phone)) {
      // console.log("Number");
      const check_user = await user.findOne({
        phone: user_email_phone,
      });
      // check_userphone
      //   ? res.json({ message: "available" })
      //   : res.json({ message: "Not-available" });

      if (!check_user) {
        return res.json({
          message: "Please enter a valid phone number or Email",
        });
      }

      // console.log(check_userphone)
      const checkPassword = await bcrypt.compare(password, check_user.password);
      if (!checkPassword) {
        res.json({
          message: "Password Incorrect",
        });
      }
      // console.log(jwt_key)
      const token = jwt.sign({ _id: check_user._id,name:check_user.name},jwt_key, { expiresIn: '1h' });
      res.json({token});
    } else {
      // console.log("String");
      const check_user = await user.findOne({
        email: user_email_phone,
      });
      // check_userEmail
      //   ? res.json({ message: "available" })
      //   : res.json({ message: "Not-available" });
      if (!check_user) {
        return res.json({
          message: "Please enter a valid phone number or Email",
        });
      }

      const checkPassword = await bcrypt.compare(password, check_user.password);
      if (!checkPassword) {
        res.json({
          message: "Password Incorrect",
        });
      }

      const token = jwt.sign({ _id: check_user._id,name:check_user.name},jwt_key, { expiresIn: '1h' });
      res.json({token});
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

module.exports = router;
