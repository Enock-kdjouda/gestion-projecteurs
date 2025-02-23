const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const projectorController = require('../controllers/projectorController');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', [
  auth,
  body('name')
    .notEmpty()
    .withMessage('Le nom du projecteur est requis')
    .trim(),
  validate
], projectorController.createProjector);

router.get('/', projectorController.getProjectors);

router.put('/:id', [
  auth,
  param('id')
    .isInt()
    .withMessage('ID invalide'),
  body('is_functional')
    .isBoolean()
    .withMessage('is_functional doit être un booléen'),
  validate
], projectorController.updateProjector);

router.delete('/:id', [
  auth,
  param('id')
    .isInt()
    .withMessage('ID invalide'),
  validate
], projectorController.deleteProjector);

module.exports = router;