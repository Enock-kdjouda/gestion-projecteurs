const db = require('../config/database');
const bcrypt = require('bcrypt');

// Créer un utilisateur
exports.createUser = (email, password, role = 'etudiant', callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);
    const sql = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    db.query(sql, [email, hash, role], (error, results) => {
      if (error) return callback(error);
      callback(null, results);
    });
  });
};

// Trouver un utilisateur par email
exports.findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (error, results) => {
    if (error) return callback(error);
    callback(null, results[0]);
  });
};

// Mettre à jour un utilisateur (exemple)
exports.updateUser = (id, data, callback) => {
  const sql = 'UPDATE users SET email = ?, role = ? WHERE id = ?';
  db.query(sql, [data.email, data.role, id], (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

// Supprimer un utilisateur (exemple)
exports.deleteUser = (id, callback) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};
