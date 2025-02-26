const db = require('../config/database');

// Créer une réservation
exports.createReservation = (userId, projectorId, startTime, endTime, status = 'en attente', callback) => {
console.log('Données de la réservation :', { userId, projectorId, startTime, endTime, status });
console.log('Start Time:', startTime);
console.log('End Time:', endTime);

  const sql = 'INSERT INTO reservations (user_id, projector_id, start_time, end_time, status) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [userId, projectorId, startTime, endTime, status], (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

// Lister toutes les réservations
exports.getAllReservations = (callback) => {
  const sql = `
    SELECT r.id, u.name AS user_name, p.name AS projector_name, r.start_time, r.end_time, r.status
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN projectors p ON r.projector_id = p.id
  `;
  db.query(sql, (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

// Modifier le statut d'une réservation
exports.updateReservationStatus = (id, status, callback) => {
  const sql = 'UPDATE reservations SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

// Supprimer une réservation
exports.deleteReservation = (id, callback) => {
  const sql = 'DELETE FROM reservations WHERE id = ?';
  db.query(sql, [id], (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};
