const db = require('../config/database');

// Créer une réservation
exports.createReservation = (userId, projectorId, startTime, endTime, status = 'en attente') => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO reservations (user_id, projector_id, start_time, end_time, status) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [userId, projectorId, startTime, endTime, status], (error, results) => {
            if (error) {
                console.error("Erreur SQL lors de la création de la réservation :", error);
                return reject(error);
            }
            if (!results.insertId) {
                return reject(new Error("Échec de l'insertion de la réservation"));
            }
            resolve({ id: results.insertId, userId, projectorId, startTime, endTime, status });
        });
    });
};

// Lister toutes les réservations
exports.getAllReservations = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT r.id, u.name AS user_name, p.name AS projector_name, r.start_time, r.end_time, r.status
            FROM reservations r
            JOIN users u ON r.user_id = u.id
            JOIN projectors p ON r.projector_id = p.id
        `;
        db.query(sql, (error, results) => {
            if (error) {
                console.error("Erreur SQL lors de la récupération des réservations :", error);
                return reject(error);
            }
            resolve(results);
        });
    });
};

// Modifier le statut d'une réservation
exports.updateReservationStatus = (id, status) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE reservations SET status = ? WHERE id = ?';
        db.query(sql, [status, id], (error, results) => {
            if (error) {
                console.error("Erreur SQL lors de la mise à jour de la réservation :", error);
                return reject(error);
            }
            if (results.affectedRows === 0) {
                return reject(new Error("Aucune réservation mise à jour, ID introuvable"));
            }
            resolve({ id, status });
        });
    });
};

// Supprimer une réservation
exports.deleteReservation = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM reservations WHERE id = ?';
        db.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Erreur SQL lors de la suppression de la réservation :", error);
                return reject(error);
            }
            if (results.affectedRows === 0) {
                return reject(new Error("Aucune réservation supprimée, ID introuvable"));
            }
            resolve({ message: "Réservation supprimée avec succès" });
        });
    });
};
