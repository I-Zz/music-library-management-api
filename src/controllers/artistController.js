const Artist = require("../models/Artist");

exports.getAllArtists = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const grammy = req.query.grammy ? parseInt(req.query.grammy) : undefined;
    const hidden = req.query.hidden ? req.query.hidden === "true" : undefined;

    const query = {};
    if (grammy !== undefined) {
      query.grammy = grammy;
    }
    if (hidden !== undefined) {
      query.hidden = hidden;
    }

    const artists = await Artist.find(query).skip(offset).limit(limit);

    res.status(200).json({
      status: 200,
      data: artists,
      message: "Artists retrieved successfully.",
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

exports.getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Artist not found",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: artist,
      message: "Artist retrieved successfully.",
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

exports.addArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json({
      status: 201,
      data: null,
      message: "Artist created successfully",
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

exports.updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByIdAndUpdate(id, req.body, { new: true });
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Artist not found",
        error: null,
      });
    }

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

exports.deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Artist not found",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: "Artist deleted successfully",
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
