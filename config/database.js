const mysql = require('mysql2');

// Crée une connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Remplace par ton nom d'utilisateur MySQL
  password: '', // Remplace par ton mot de passe MySQL
  database: 'gestion_projecteurs' // Nom de ta base de données
});

// Test de la connexion
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL avec l\'ID', db.threadId);
});

module.exports = db;
