const { body, param, query } = require("express-validator");

// Auth validation schemas
exports.signupSchema = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.loginSchema = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

// User management validation schemas
exports.addUserSchema = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .isIn(["editor", "viewer", "admin"])
    .withMessage('Role must be either "editor" or "viewer"'),
];

// Artist validation schemas
exports.addArtistSchema = [
  body("name").notEmpty().withMessage("Artist name is required"),
  body("grammy")
    .isInt({ min: 0 })
    .withMessage("Grammy count must be a non-negative integer"),
  body("hidden").isBoolean().withMessage("Hidden must be a boolean value"),
];

// Album validation schemas
exports.addAlbumSchema = [
  body("name").notEmpty().withMessage("Album name is required"),
  body("year").isInt({ min: 1900 }).withMessage("Year must be a valid year"),
  body("artist_id").isMongoId().withMessage("Invalid artist ID"),
  body("hidden").isBoolean().withMessage("Hidden must be a boolean value"),
];

// Track validation schemas
exports.addTrackSchema = [
  body("name").notEmpty().withMessage("Track name is required"),
  body("duration")
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive integer"),
  body("album_id").isMongoId().withMessage("Invalid album ID"),
  body("artist_id").isMongoId().withMessage("Invalid artist ID"),
  body("hidden").isBoolean().withMessage("Hidden must be a boolean value"),
];

// Favorites validation schemas
exports.addFavoriteSchema = [
  body("category")
    .isIn(["artist", "album", "track"])
    .withMessage('Category must be "artist", "album", or "track"'),
  body("item_id").isMongoId().withMessage("Invalid item ID"),
];
