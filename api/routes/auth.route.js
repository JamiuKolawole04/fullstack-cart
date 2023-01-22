const bcrypt = require("bcrypt");
const Joi = require("joi");
const { Router } = require("express");
const router = Router();

const { User } = require("../models/user.model");
const generateAuthToken = require("../utils/token");

router.post("/register", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(120).required().email(),
    password: Joi.string().min(3).max(1024).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      error,
    });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).json({
      success: false,
      message: "user already exists",
    });
  }

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();
  const token = generateAuthToken(user);

  res.status(201).json({
    success: true,
    message: "user registration successful",
    access_token: token,
  });
});

router.post("/login", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(120).required().email(),
    password: Joi.string().min(3).max(1024).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      error,
    });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(409).json({
      success: false,
      message: "invalid email or password",
    });
  }

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (!isValid) {
    return res.status(409).json({
      success: false,
      message: "invalid email or password",
    });
  }

  const token = generateAuthToken(user);

  res.status(201).json({
    success: true,
    message: "login success",
    access_token: token,
  });
});

module.exports = router;
