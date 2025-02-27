const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, isAdmin } = require('../middleware/auth');

// Validation middleware
const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(['etudiant', 'admin'])
];

// Routes
router.post('/register', validateRegistration, userController.register);
router.post('/login', userController.login);
router.put('/:id', auth, isAdmin, userController.updateUser);
router.delete('/:id', auth, isAdmin, userController.deleteUser);
router.get('/search', userController.getUserByEmail);

module.exports = router;