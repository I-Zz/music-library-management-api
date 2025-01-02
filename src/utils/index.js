const logger = require('./logger');
const { hashPassword, verifyPassword } = require('./passwordHash');
const { generateToken, verifyToken } = require('./tokenGenerator');
const {
    signupSchema,
    loginSchema,
    addUserSchema,
    addArtistSchema,
    addAlbumSchema,
    addTrackSchema,
    addFavoriteSchema,
} = require('./validationSchemas');

module.exports = {
    logger,
    hashPassword,
    verifyPassword,
    generateToken,
    verifyToken,
    signupSchema,
    loginSchema,
    addUserSchema,
    addArtistSchema,
    addAlbumSchema,
    addTrackSchema,
    addFavoriteSchema,
};
