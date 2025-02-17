const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'gestion_projecteurs' 
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
