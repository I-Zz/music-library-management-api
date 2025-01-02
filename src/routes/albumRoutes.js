const express = require('express');
const { albumController } = require('../controllers');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateRequest');
const { addAlbumSchema } = require('../utils/validationSchemas');

const router = express.Router();

// Get all albums
router.get('/', authenticate, albumController.getAllAlbums);

// Get album by ID
router.get('/:id', authenticate, albumController.getAlbumById);

// Add a new album (Admin or Editor only)
router.post('/add-album', authenticate, authorize(['admin', 'editor']), validate(addAlbumSchema), albumController.addAlbum);

// Update an album (Admin or Editor only)
router.put('/:id', authenticate, authorize(['admin', 'editor']), albumController.updateAlbum);

// Delete an album (Admin only)
router.delete('/:id', authenticate, authorize(['admin']), albumController.deleteAlbum);

module.exports = router;
