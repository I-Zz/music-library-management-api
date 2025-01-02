const express = require('express');
const { artistController } = require('../controllers');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateRequest');
const { addArtistSchema } = require('../utils/validationSchemas');

const router = express.Router();

// Get all artists
router.get('/', authenticate, artistController.getAllArtists);

// Get artist by ID
router.get('/:id', authenticate, artistController.getArtistById);

// Add a new artist (Admin or Editor only)
router.post('/add-artist', authenticate, authorize(['admin', 'editor']), validate(addArtistSchema), artistController.addArtist);

// Update an artist (Admin or Editor only)
router.put('/:id', authenticate, authorize(['admin', 'editor']), artistController.updateArtist);

// Delete an artist (Admin only)
router.delete('/:id', authenticate, authorize(['admin']), artistController.deleteArtist);

module.exports = router;
