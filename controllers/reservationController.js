const Reservation = require('../models/reservationModels');

// Créer une nouvelle réservation
exports.createReservation = async (req, res) => {
    try {
        const { projector_id, start_time, end_time } = req.body;
        const user_id = req.user.userId;

        const newReservation = await Reservation.createReservation(user_id, projector_id, start_time, end_time, 'en attente');
        
        res.status(201).json({
            message: 'Réservation créée avec succès',
            reservation: newReservation
        });
    } catch (error) {
        console.error("Erreur lors de la création de la réservation :", error);
        res.status(500).json({ error: 'Erreur lors de la création de la réservation', details: error.message });
    }
};

// Récupérer toutes les réservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.getAllReservations();
        res.json(reservations);
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
        res.status(500).json({ error: 'Erreur lors de la récupération des réservations', details: error.message });
    }
};

// Mettre à jour le statut d'une réservation
exports.updateReservationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const result = await Reservation.updateReservationStatus(id, status);

        res.json({ message: 'Statut de la réservation mis à jour avec succès', reservation: result });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la réservation :", error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la réservation', details: error.message });
    }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.userId;

        // Vérification supplémentaire pour s'assurer que l'utilisateur ne peut supprimer que ses propres réservations
        if (req.user.role !== 'admin') {
            const reservations = await Reservation.getAllReservations();
            const userReservation = reservations.find(res => res.id == id && res.user_id == user_id);
            if (!userReservation) {
                return res.status(403).json({ error: "Vous n'avez pas l'autorisation de supprimer cette réservation" });
            }
        }

        await Reservation.deleteReservation(id);
        res.json({ message: 'Réservation supprimée avec succès' });

    } catch (error) {
        console.error("Erreur lors de la suppression de la réservation :", error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la réservation', details: error.message });
    }
};
