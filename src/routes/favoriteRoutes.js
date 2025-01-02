const express = require('express');
const { favoriteController } = require('../controllers');
const { authenticate } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateRequest');
const { addFavoriteSchema } = require('../utils/validationSchemas');

const router = express.Router();

// Get all favorites by category
router.get('/:category', authenticate, favoriteController.getFavoritesByCategory);

// Add a new favorite
router.post('/add-favorite', authenticate, validate(addFavoriteSchema), favoriteController.addFavorite);

// Remove a favorite by ID
router.delete('/remove-favorite/:id', authenticate, favoriteController.removeFavorite);

module.exports = router;
