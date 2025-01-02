const Track = require("../models/Track");

exports.getAllTracks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const artist_id = req.query.artist_id;
    const album_id = req.query.album_id;
    const hidden = req.query.hidden ? req.query.hidden === "true" : undefined;

    const query = {};
    if (artist_id) {
      query.artist_id = artist_id;
    }
    if (album_id) {
      query.album_id = album_id;
    }
    if (hidden !== undefined) {
      query.hidden = hidden;
    }

    // const query = { ...req.query, hidden: false };
    const tracks = await Track.find(query).skip(offset).limit(limit);

    // if (tracks.length === 0) {
    //   return res.status(404).json({
    //     status: 404,
    //     data: null,
    //     message: "Resource doesn't exist.",
    //     error: null,
    //   });
    // }

    res.status(200).json({
      status: 200,
      data: tracks,
      message: "Tracks retrieved successfully.",
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

exports.getTrackById = async (req, res) => {
  try {
    const { id } = req.params;
    const track = await Track.findById(id);
    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource doesn't exist.",
        error: null,
      });
    }

    // if (track.hidden) {
    //   return res.status(403).json({
    //     status: 403,
    //     data: album,
    //     message: "Forbidden Access.",
    //     error: null,
    //   });
    // }

    res.status(200).json({
      status: 200,
      data: track,
      message: "Track retrieved successfully.",
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

exports.addTrack = async (req, res) => {
  try {
    const track = await Track.create(req.body);
    res.status(201).json({
      status: 201,
      data: null,
      message: "Track created successfully.",
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

exports.updateTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const track = await Track.findByIdAndUpdate(id, req.body, { new: true });
    if (!track)
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

exports.deleteTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const track = await Track.findByIdAndDelete(id);
    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource doesn't exist.",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: "Track deleted successfully.",
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
