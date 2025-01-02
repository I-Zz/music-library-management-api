const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    // if (existingUser) return res.status(409).json({ message: 'Email already exists' });
    if (existingUser)
      return res.status(409).json({
        status: 409,
        data: null,
        message: "Email already exists.",
        error: null,
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = (await User.countDocuments()) === 0 ? "admin" : "viewer"; // First user is admin
    const user = await User.create({ email, password: hashedPassword, role });

    // res.status(201).json({ message: 'User created successfully', user });
    res.status(201).json({
      status: 201,
      data: null,
      message: "User created successfully.",
      error: null,
    });
  } catch (error) {
    // res.status(500).json({ message: 'Server error.', error: error.message });
    res.status(500).json({
      status: 500,
      data: null,
      message: "Server error.",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        status: 404,
        data: null,
        message: "User not found.",
        error: null,
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      //   return res.status(400).json({ message: "Invalid credentials" });
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Bad Request, Reason:Invalid credentials",
        error: null,
      });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // res.status(200).json({ message: "Login successful", token });
    res.status(200).json({
      status: 200,
      data: {
        token: token,
      },
      message: "Login successful.",
      error: null,
    });
  } catch (error) {
    // res.status(500).json({ message: 'Server error.', error: error.message });
    res.status(500).json({
      status: 500,
      data: null,
      message: "Server error.",
      error: error.message,
    });
  }
};

exports.logout = (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Bad Request",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: "User logged out successfully.",
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Server error.",
      error: error.message,
    });
  }
};
