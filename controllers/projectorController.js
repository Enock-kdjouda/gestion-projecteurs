const Projector = require('../models/projectorModels');

// Créer un nouveau projecteur
exports.createProjector = async (req, res) => {
    try {
        const { name, description, status, available } = req.body;
        const newProjector = await Projector.addProjector(name, description, status, available);
        
        res.status(201).json({
            message: 'Projecteur créé avec succès',
            projector: newProjector
        });
    } catch (error) {
        console.error("Erreur lors de la création du projecteur :", error);
        res.status(500).json({ error: 'Erreur lors de la création du projecteur', details: error.message });
    }
};

// Récupérer tous les projecteurs
exports.getAllProjectors = async (req, res) => {
    try {
        const projectors = await Projector.getAllProjectors();
        res.json(projectors);
    } catch (error) {
        console.error("Erreur lors de la récupération des projecteurs :", error);
        res.status(500).json({ error: 'Erreur lors de la récupération des projecteurs', details: error.message });
    }
};

// Mettre à jour le statut d'un projecteur
exports.updateProjectorStatus = async (req, res) => {
    try {
        const projectorId = req.params.id;
        const { status, available } = req.body;

        const result = await Projector.updateProjectorStatus(projectorId, { status, available });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Projecteur non trouvé' });
        }

        res.json({ message: 'Projecteur mis à jour avec succès' });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du projecteur :", error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du projecteur', details: error.message });
    }
};

// Supprimer un projecteur
exports.deleteProjector = async (req, res) => {
    try {
        const projectorId = req.params.id;
        const result = await Projector.deleteProjector(projectorId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Projecteur non trouvé' });
        }

        res.json({ message: 'Projecteur supprimé avec succès' });
    } catch (error) {
        console.error("Erreur lors de la suppression du projecteur :", error);
        res.status(500).json({ error: 'Erreur lors de la suppression du projecteur', details: error.message });
    }
};
