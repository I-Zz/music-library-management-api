const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in seconds
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    artist_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);
