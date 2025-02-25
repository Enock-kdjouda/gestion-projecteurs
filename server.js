const express = require('express');
const db = require('./config/database');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la requête SQL' });
    }
    res.status(200).json({ message: 'Bienvenue sur l\'API de gestion des projecteurs , connexion réussi à MySQL!', result: results[0].solution });
  });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
