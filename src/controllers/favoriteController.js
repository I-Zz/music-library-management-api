const Favorite = require("../models/Favorite");

exports.getFavoritesByCategory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;

    const { category } = req.params;
    const favorites = await Favorite.find({
      category,
      userId: req.user.userId,
    })
      .skip(offset)
      .limit(limit);
    res.status(200).json({
      status: 200,
      data: favorites,
      message: "Favorites retrieved successfully",
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

exports.addFavorite = async (req, res) => {
  try {
    const { category, item_id } = req.body;
    const existingFavorite = await Favorite.findOne({
      category,
      item_id,
      userId: req.user.userId,
    });

    if (existingFavorite)
      return res.status(409).json({
        status: 409,
        data: null,
        message: "Favorite already exists",
        error: null,
      });

    const favorite = await Favorite.create({
      category,
      item_id,
      userId: req.user.userId,
    });
    res.status(201).json({
      status: 201,
      data: null,
      message: "Favorite added successfully",
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

exports.removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const favorite = await Favorite.findByIdAndDelete(id);

    if (!favorite) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Favorite not found",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: "Favorite removed successfully",
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
