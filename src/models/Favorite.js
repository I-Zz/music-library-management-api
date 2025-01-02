const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    category: { type: String, enum: ['artist', 'album', 'track'], required: true },
    item_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // References artist, album, or track
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
