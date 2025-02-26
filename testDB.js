const userModel = require('./models/userModels'); // Chemin vers ton modèle utilisateur
const projectorModel = require('./models/projectorModels'); // Chemin vers ton modèle projecteur
const reservationModel = require('./models/reservationModels'); // Chemin vers ton modèle réservation
const db = require('./config/database'); // Chemin vers ton fichier de connexion à la base de données

// Fonction utilitaire pour afficher les résultats
const assert = (condition, message) => {
  if (!condition) {
    console.error(`Assertion échouée: ${message}`);
    process.exit(1); // Sortir du processus avec une erreur
  }
};

// Tests pour les utilisateurs
const testUsers = () => {
  console.log('Test des utilisateurs');

  userModel.createUser('test@example.com', 'password123', 'etudiant', (err, result) => {
    assert(!err, 'Erreur lors de la création de l\'utilisateur');
    assert(result.insertId, 'L\'ID de l\'utilisateur n\'a pas été retourné');

    userModel.findUserByEmail('test@example.com', (err, user) => {
      assert(!err, 'Erreur lors de la recherche de l\'utilisateur par email');
      assert(user.email === 'test@example.com', 'L\'email de l\'utilisateur ne correspond pas');

      userModel.updateUser(1, { email: 'updated@example.com', role: 'enseignant' }, (err, result) => {
        assert(!err, 'Erreur lors de la mise à jour de l\'utilisateur');

        userModel.deleteUser(1, (err, result) => {
          assert(!err, 'Erreur lors de la suppression de l\'utilisateur');
          console.log('Tests des utilisateurs terminés avec succès');
        });
      });
    });
  });
};

// Tests pour les projecteurs
const testProjectors = () => {
  console.log('Test des projecteurs');

  projectorModel.addProjector('Projecteur 1', 'Description du projecteur 1', 'fonctionnel', true, (err, result) => {
    assert(!err, 'Erreur lors de l\'ajout du projecteur');
    assert(result.insertId, 'L\'ID du projecteur n\'a pas été retourné');

    projectorModel.getAllProjectors((err, projectors) => {
      assert(!err, 'Erreur lors de la récupération des projecteurs');
      assert(Array.isArray(projectors), 'Les résultats ne sont pas un tableau');

      projectorModel.updateProjectorStatus(1, { status: 'en panne', available: false }, (err, result) => {
        assert(!err, 'Erreur lors de la mise à jour du projecteur');

        projectorModel.deleteProjector(1, (err, result) => {
          assert(!err, 'Erreur lors de la suppression du projecteur');
          console.log('Tests des projecteurs terminés avec succès');
        });
      });
    });
  });
};

// Tests pour les réservations
const testReservations = () => {
    console.log('Test des réservations');
  
    const now = new Date();
    const startTime = now.toISOString().slice(0, 19).replace('T', ' ');
    const endTime = new Date(now.getTime() + 3600000).toISOString().slice(0, 19).replace('T', ' '); // +1h
    
    reservationModel.createReservation(1, 1, startTime, endTime, 'en attente', (err, result) => { // Changement ici
      assert(!err, 'Erreur lors de la création de la réservation');
      assert(result.insertId, 'L\'ID de la réservation n\'a pas été retourné');
  
      reservationModel.getAllReservations((err, reservations) => {
        assert(!err, 'Erreur lors de la récupération des réservations');
        assert(Array.isArray(reservations), 'Les résultats ne sont pas un tableau');
  
        reservationModel.updateReservationStatus(1, 'terminée', (err, result) => {
          assert(!err, 'Erreur lors de la mise à jour de la réservation');
  
          reservationModel.deleteReservation(1, (err, result) => {
            assert(!err, 'Erreur lors de la suppression de la réservation');
            console.log('Tests des réservations terminés avec succès');
          });
        });
      });
    });
  };
  

// Exécuter tous les tests
const runTests = () => {
  testUsers();
  testProjectors();
  testReservations();

  // Fermer la connexion à la base de données après tous les tests
  db.end((err) => {
    if (err) {
      console.error('Erreur lors de la fermeture de la connexion à MySQL:', err);
    }
    console.log('Connexion à la base de données fermée.');
  });
};

// Démarrer les tests
runTests();
