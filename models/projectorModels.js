const db = require('../config/database');

// Ajouter un projecteur avec status et disponibilité
exports.addProjector = (name, description, status = 'fonctionnel', available = true, callback) => {
    const sql = 'INSERT INTO projectors (name, description, status, available) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, description, status, available ? 1 : 0], (error, results) => {
      if (error) return callback(error);
      callback(null, results);
    });
  };

// Lister tous les projecteurs
exports.getAllProjectors = (callback) => {
  const sql = 'SELECT * FROM projectors';
  db.query(sql, (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

// Modifier l'état et la disponibilité d'un projecteur
exports.updateProjectorStatus = (id, data, callback) => {
  const { status, available } = data;
  const sql = 'UPDATE projectors SET status = ?, available = ? WHERE id = ?';
  db.query(sql, [status, available, id], (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

// Supprimer un projecteur
exports.deleteProjector = (id, callback) => {
  const sql = 'DELETE FROM projectors WHERE id = ?';
  db.query(sql, [id], (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};
