const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const projectorController = require('../controllers/projectorController');
const { auth, isAdmin } = require('../middleware/auth');

// Validation middleware
const validateProjector = [
  body('name').notEmpty().trim(),
  body('description').optional().trim(),
  body('status').optional().isIn(['fonctionnel', 'non fonctionnel']),
  body('available').optional().isBoolean()
];

// Routes
router.post('/', auth, isAdmin, validateProjector, projectorController.createProjector);
router.get('/', auth, projectorController.getAllProjectors);
router.put('/:id', auth, isAdmin, projectorController.updateProjectorStatus);
router.delete('/:id', auth, isAdmin, projectorController.deleteProjector);

module.exports = router;