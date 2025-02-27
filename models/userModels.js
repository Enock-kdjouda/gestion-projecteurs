const db = require('../config/database');
const bcrypt = require('bcrypt');

// Créer un utilisateur (avec Promises)
exports.createUser = (email, password, role = 'etudiant') => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);

      const sql = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
      db.query(sql, [email, hash, role], (error, results) => {
        if (error) {
          console.error("Erreur SQL lors de l'inscription :", error);
          return reject(error);
        }
        if (!results || !results.insertId) {
          return reject(new Error("Échec de l'insertion de l'utilisateur"));
        }
        console.log(" Insertion réussie :", results);
        resolve({ id: results.insertId, email, role });
      });
    });
  });
};

// Trouver un utilisateur par email
exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (error, results) => {
      if (error) {
        console.error(" Erreur SQL lors de la recherche d'utilisateur :", error);
        return reject(error);
      }
      resolve(results.length > 0 ? results[0] : null);
    });
  });
};

// Mettre à jour un utilisateur
exports.updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE users SET email = ?, role = ? WHERE id = ?';
    db.query(sql, [data.email, data.role, id], (error, results) => {
      if (error) {
        console.error(" Erreur SQL lors de la mise à jour de l'utilisateur :", error);
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Supprimer un utilisateur
exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (error, results) => {
      if (error) {
        console.error(" Erreur SQL lors de la suppression de l'utilisateur :", error);
        return reject(error);
      }
      resolve(results);
    });
  });
};