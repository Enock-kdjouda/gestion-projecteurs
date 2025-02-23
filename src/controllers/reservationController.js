const db = require('../config/database');

const createReservation = (req, res) => {
  const { projector_id, start_time, end_time } = req.body;
  const user_id = req.user.userId;

  // Check if projector is available for the time slot
  const checkSql = `
    SELECT * FROM reservations 
    WHERE projector_id = ? 
    AND ((start_time BETWEEN ? AND ?) 
    OR (end_time BETWEEN ? AND ?))
  `;

  db.get(checkSql, [projector_id, start_time, end_time, start_time, end_time], (err, existing) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking availability' });
    }
    if (existing) {
      return res.status(400).json({ error: 'Time slot not available' });
    }

    const sql = `
      INSERT INTO reservations (user_id, projector_id, start_time, end_time)
      VALUES (?, ?, ?, ?)
    `;
    
    db.run(sql, [user_id, projector_id, start_time, end_time], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error creating reservation' });
      }
      res.status(201).json({
        id: this.lastID,
        message: 'Reservation created successfully'
      });
    });
  });
};

const getReservations = (req, res) => {
  const sql = `
    SELECT r.*, u.email as user_email, p.name as projector_name
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN projectors p ON r.projector_id = p.id
  `;
  
  db.all(sql, [], (err, reservations) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching reservations' });
    }
    res.json(reservations);
  });
};

const deleteReservation = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.userId;
  
  const sql = 'DELETE FROM reservations WHERE id = ? AND user_id = ?';
  db.run(sql, [id, user_id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error deleting reservation' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Reservation not found or unauthorized' });
    }
    res.json({ message: 'Reservation deleted successfully' });
  });
};

module.exports = {
  createReservation,
  getReservations,
  deleteReservation
};