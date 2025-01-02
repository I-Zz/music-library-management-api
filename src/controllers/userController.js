const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Bad Request",
        error: null,
      });
    }
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const role = req.query.role;

    const query = {};
    if (role) {
      query.role = role;
    }

    const users = await User.find(query, "-password").skip(offset).limit(limit);
    
    res.status(200).json({
      status: 200,
      data: users,
      message: "Users retrieved successfully.",
      error: null,
    });
  } catch (error) {
    // res.status(500).json({ message: "Server error", error: error.message });
    res.status(500).json({
      status: 500,
      data: null,
      message: "Server error.",
      error: error.message,
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        data: null,
        message: "Email already exists.",
        error: null,
      });
    }
    if (req.body.role === "admin") {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Forbidden Access/Operation not allowed.",
        error: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });

    res.status(201).json({
      status: 201,
      data: null,
      message: "User created successfully.",
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "User not found.",
        error: null,
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Forbidden Access/Operation not allowed.",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: "User deleted successfully.",
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

exports.updatePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "User not found",
        error: null,
      });
    }

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      // return res.status(400).json({ message: "Old password is incorrect" });
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Bad Request, Reason: Old password is incorrect.",
        error: null,
      });
    }

    user.password = await bcrypt.hash(new_password, 10);
    await user.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Server error.",
      error: error.message,
    });
  }
};
