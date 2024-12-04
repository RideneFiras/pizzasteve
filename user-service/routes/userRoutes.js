const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController'); // Add getProfile
const authMiddleware = require('../middlewares/authMiddleware'); // Add authMiddleware

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User profile route (protected, requires token)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
