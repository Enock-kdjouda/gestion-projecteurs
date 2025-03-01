const userModel = require('./models/userModels'); 
const reservationModel = require('./models/reservationModels');
const projectorModel = require('./models/projectorModels');

describe('Models Tests', () => {
    let userId; // Pour stocker l'ID de l'utilisateur
    let projectorId; // Pour stocker l'ID du projecteur
    let reservationId; // Pour stocker l'ID de la réservation

    // Avant tous les tests, créez un utilisateur et un projecteur
    beforeAll(async () => {
        const user = await userModel.createUser('test@example.com', 'password123');
        userId = user.id;

        const projector = await projectorModel.addProjector('Projecteur Test', 'Description du projecteur');
        projectorId = projector.id;
    });

    test('User: should create a user', async () => {
        const user = await userModel.createUser('another@example.com', 'password456', 'etudiant');
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email', 'another@example.com');
        expect(user).toHaveProperty('role', 'etudiant');
    });

    test('User: should find a user by email', async () => {
        const user = await userModel.findUserByEmail('test@example.com');
        expect(user).toHaveProperty('email', 'test@example.com');
    });

    test('Reservation: should create a reservation', async () => {
        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); 
        const reservation = await reservationModel.createReservation(userId, projectorId, startTime, endTime);
        reservationId = reservation.id; // Stockez l'ID de la réservation
        expect(reservation).toHaveProperty('id');
        expect(reservation).toHaveProperty('userId', userId);
        expect(reservation).toHaveProperty('projectorId', projectorId);
        expect(reservation).toHaveProperty('status', 'en attente');
    });

    test('Reservation: should get all reservations', async () => {
        const reservations = await reservationModel.getAllReservations();
        expect(reservations).toBeInstanceOf(Array);
        expect(reservations.length).toBeGreaterThan(0);
    });

    test('Projector: should add a projector', async () => {
        const projector = await projectorModel.addProjector('Another Projector', 'Another Description');
        projectorId = projector.id; // Mettez à jour l'ID du projecteur
        expect(projector).toHaveProperty('id');
        expect(projector).toHaveProperty('name', 'Another Projector');
    });

    test('Projector: should get all projectors', async () => {
        const projectors = await projectorModel.getAllProjectors();
        expect(projectors).toBeInstanceOf(Array);
        expect(projectors.length).toBeGreaterThan(0);
    });

    test('Reservation: should update reservation status', async () => {
        const newStatus = 'approuvée';
        const result = await reservationModel.updateReservationStatus(reservationId, newStatus);
        expect(result.status).toBe(newStatus);
    });

    test('User: should update a user', async () => {
        const updatedUser = await userModel.updateUser(userId, { email: 'updated@example.com', role: 'enseignant' });
        expect(updatedUser).toBeDefined(); // Vérifiez que l'utilisateur a été mis à jour
    });

    test('Reservation: should delete a reservation', async () => {
        const result = await reservationModel.deleteReservation(reservationId);
        expect(result).toHaveProperty('message', 'Réservation supprimée avec succès');
    });

    test('Projector: should delete a projector', async () => {
        const result = await projectorModel.deleteProjector(projectorId);
        expect(result).toHaveProperty('message', 'Projecteur supprimé avec succès');
    });

    // Après tous les tests, supprimez l'utilisateur créé pour les tests
    afterAll(async () => {
        await userModel.deleteUser(userId);
    });
});

