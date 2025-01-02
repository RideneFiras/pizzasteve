const express = require('express');
const { registerUser, loginUser, getProfile, getAllUsers, deleteUser } = require('../controllers/userController'); // Add getAllUsers and deleteUser
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware'); // Destructure both middlewares

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User profile route (protected, requires token)
router.get('/profile', authMiddleware, getProfile);

// Admin-specific routes
router.get('/', authMiddleware, isAdmin, getAllUsers); // Fetch all users
router.delete('/:id', authMiddleware, isAdmin, deleteUser); // Delete a user

module.exports = router;
