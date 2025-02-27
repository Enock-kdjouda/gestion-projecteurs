const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { auth, isAdmin } = require('../middleware/auth');

// Validation middleware
const validateReservation = [
  body('projector_id').isInt(),
  body('start_time').isISO8601(),
  body('end_time').isISO8601().custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.start_time)) {
      throw new Error('La date de fin doit être postérieure à la date de début');
    }
    return true;
  })
];

// Routes
router.post('/', auth, validateReservation, reservationController.createReservation);
router.get('/', auth, reservationController.getAllReservations);
router.put('/:id/status', auth, isAdmin, reservationController.updateReservationStatus);
router.delete('/:id', auth, reservationController.deleteReservation);

module.exports = router;