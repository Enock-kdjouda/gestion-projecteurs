const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const reservationController = require('../controllers/reservationController');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', [
  auth,
  body('projector_id')
    .isInt()
    .withMessage('ID du projecteur invalide'),
  body('start_time')
    .isISO8601()
    .withMessage('Format de date invalide pour start_time'),
  body('end_time')
    .isISO8601()
    .withMessage('Format de date invalide pour end_time')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start_time)) {
        throw new Error('La date de fin doit être postérieure à la date de début');
      }
      return true;
    }),
  validate
], reservationController.createReservation);

router.get('/', auth, reservationController.getReservations);

router.delete('/:id', [
  auth,
  param('id')
    .isInt()
    .withMessage('ID invalide'),
  validate
], reservationController.deleteReservation);

module.exports = router;