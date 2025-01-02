const Album = require("../models/Album");

exports.getAllAlbums = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const artist_id = req.query.artist_id;
    const hidden = req.query.hidden ? req.query.hidden === "true" : undefined;

    const query = {};
    if (artist_id) {
      query.artist_id = artist_id;
    }
    if (hidden !== undefined) {
      query.hidden = hidden;
    }

    // const query = { ...req.query, hidden: false };
    const albums = await Album.find(query).skip(offset).limit(limit);

    // if (albums.length === 0) {
    //   return res.status(404).json({
    //     status: 404,
    //     data: null,
    //     message: "Resource doesn't exist.",
    //     error: null,
    //   });
    // }

    res.status(200).json({
      status: 200,
      data: albums,
      message: "Albums retrieved successfully.",
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

exports.getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({
        status: 404,
        data: album,
        message: "Resource doesn't exist.",
        error: null,
      });
    }

    // if (album.hidden) {
    //   return res.status(403).json({
    //     status: 403,
    //     data: album,
    //     message: "Forbidden Access.",
    //     error: null,
    //   });
    // }

    res.status(200).json({
      status: 200,
      data: album,
      message: "Album retrieved successfully.",
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

exports.addAlbum = async (req, res) => {
  try {
    const album = await Album.create(req.body);
    res.status(201).json({
      status: 201,
      data: null,
      message: "Album created successfully.",
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

exports.updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByIdAndUpdate(id, req.body, { new: true });
    if (!album)
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource doesn't exist.",
        error: null,
      });

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

exports.deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByIdAndDelete(id);
    if (!album) return res.status(404).json({ message: "Album not found" });

    res.status(200).json({
      status: 200,
      data: null,
      message: "Album deleted successfully",
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
