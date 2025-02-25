const userModel = require('./models/userModels');
const projectorModel = require('./models/projectorModels');
const reservationModel = require('./models/reservationModels');

// Tester la création d'un utilisateur
userModel.createUser('test@example.com', 'password123', 'etudiant', (err, result) => {
  if (err) {
    return console.error('Erreur lors de la création de l\'utilisateur:', err);
  }
  console.log('Utilisateur créé:', result);

  // Récupérer l'utilisateur créé
  userModel.findUserByEmail('test@example.com', (err, user) => {
    if (err) {
      return console.error('Erreur lors de la récupération de l\'utilisateur:', err);
    }
    console.log('Utilisateur trouvé:', user);

    // Tester l'ajout d'un projecteur
    projectorModel.addProjector('Projecteur 1', 'Description du projecteur 1', 'fonctionnel', true, (err, result) => {
      if (err) {
        return console.error('Erreur lors de l\'ajout du projecteur:', err);
      }
      console.log('Projecteur ajouté:', result);

      // Récupérer le projecteur (pour simplifier, on récupère la liste et on prend le premier)
      projectorModel.getAllProjectors((err, projectors) => {
        if (err) {
          return console.error('Erreur lors de la récupération des projecteurs:', err);
        }
        console.log('Liste des projecteurs:', projectors);

        if (projectors.length > 0) {
          const projector = projectors[0];

          // Créer une réservation
          const now = new Date();
          const startTime = now.toISOString().slice(0, 19).replace('T', ' ');
          const endTime = new Date(now.getTime() + 3600000).toISOString().slice(0, 19).replace('T', ' '); // +1h

          reservationModel.createReservation(user.id, projector.id, startTime, endTime, (err, result) => {
            if (err) {
              return console.error('Erreur lors de la création de la réservation:', err);
            }
            console.log('Réservation créée:', result);

            // Lister toutes les réservations
            reservationModel.getAllReservations((err, reservations) => {
              if (err) {
                return console.error('Erreur lors de la récupération des réservations:', err);
              }
              console.log('Liste des réservations:', reservations);
            });
          });
        }
      });
    });
  });
});
