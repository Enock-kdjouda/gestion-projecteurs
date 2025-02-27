const db = require('../config/database');

// Ajouter un projecteur avec état et disponibilité
exports.addProjector = (name, description, status = 'fonctionnel', available = true) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO projectors (name, description, status, available) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, description, status, available ? 1 : 0], (error, results) => {
            if (error) {
                console.error("Erreur SQL lors de l'ajout du projecteur :", error);
                return reject(error);
            }
            if (!results.insertId) {
                return reject(new Error("Échec de l'insertion du projecteur"));
            }
            resolve({ id: results.insertId, name, description, status, available });
        });
    });
};

// Récupérer tous les projecteurs
exports.getAllProjectors = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM projectors';
        db.query(sql, (error, results) => {
            if (error) {
                console.error("Erreur SQL lors de la récupération des projecteurs :", error);
                return reject(error);
            }
            resolve(results);
        });
    });
};

// Modifier l'état et la disponibilité d'un projecteur
exports.updateProjectorStatus = (id, data) => {
    return new Promise((resolve, reject) => {
        const { status, available } = data;

        if (typeof available !== 'boolean') {
            return reject(new Error("La disponibilité doit être un booléen (true ou false)"));
        }

        const sql = 'UPDATE projectors SET status = ?, available = ? WHERE id = ?';
        db.query(sql, [status, available ? 1 : 0, id], (error, results) => {
            if (error) {
                console.error("Erreur SQL lors de la mise à jour du projecteur :", error);
                return reject(error);
            }
            if (results.affectedRows === 0) {
                return reject(new Error("Aucun projecteur mis à jour, ID introuvable"));
            }
            resolve({ id, status, available });
        });
    });
};

// Supprimer un projecteur
exports.deleteProjector = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM projectors WHERE id = ?';
        db.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Erreur SQL lors de la suppression du projecteur :", error);
                return reject(error);
            }
            if (results.affectedRows === 0) {
                return reject(new Error("Aucun projecteur supprimé, ID introuvable"));
            }
            resolve({ message: "Projecteur supprimé avec succès" });
        });
    });
};
