const express = require('express');
const { authController } = require('../controllers');
const { validateAuth } = require('../middleware/validateRequest');
const { signupSchema, loginSchema } = require('../utils/validationSchemas');

const router = express.Router();

// User signup
router.post('/signup', validateAuth(signupSchema), authController.signup);

// User login
router.post('/login', validateAuth(loginSchema), authController.login);

// User logout
router.get('/logout', authController.logout);

module.exports = router;
