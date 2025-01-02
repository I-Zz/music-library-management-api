const express = require('express');
const { trackController } = require('../controllers');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateRequest');
const { addTrackSchema } = require('../utils/validationSchemas');

const router = express.Router();

// Get all tracks
router.get('/', authenticate, trackController.getAllTracks);

// Get track by ID
router.get('/:id', authenticate, trackController.getTrackById);

// Add a new track (Admin or Editor only)
router.post('/add-track', authenticate, authorize(['admin', 'editor']), validate(addTrackSchema), trackController.addTrack);

// Update a track (Admin or Editor only)
router.put('/:id', authenticate, authorize(['admin', 'editor']), trackController.updateTrack);

// Delete a track (Admin only)
router.delete('/:id', authenticate, authorize(['admin']), trackController.deleteTrack);

module.exports = router;
