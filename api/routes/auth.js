const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(401).json("Wrong password or email");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPasssword = bytes.toString(CryptoJS.enc.Utf8);

    originalPasssword !== req.body.password && res.status(401).json("Wrong password or email");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
