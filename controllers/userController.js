const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

// Inscription d'un utilisateur
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log("Données reçues :", req.body);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Créer l'utilisateur
    const newUser = await User.createUser(email, password, role);
    res.status(201).json({ message: 'Utilisateur créé avec succès', userId: newUser.id });

  } catch (error) {
    console.error(" Erreur lors de l'inscription :", error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription', details: error.message });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      userId: user.id,
      email: user.email,
      role: user.role,
      token
    });

  } catch (error) {
    console.error(" Erreur lors de la connexion :", error);
    res.status(500).json({ error: 'Erreur lors de la connexion', details: error.message });
  }
};

// Mise à jour d'un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, role } = req.body;

    const updatedUser = await User.updateUser(userId, { email, role });

    if (updatedUser.affectedRows === 0) {
      return res.status(404).json({ error: 'Aucune mise à jour effectuée' });
    }

    res.json({ message: 'Utilisateur mis à jour avec succès' });

  } catch (error) {
    console.error(" Erreur lors de la mise à jour :", error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour', details: error.message });
  }
};

// Suppression d'un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.deleteUser(userId);

    if (deletedUser.affectedRows === 0) {
      return res.status(404).json({ error: 'Aucune suppression effectuée' });
    }

    res.json({ message: 'Utilisateur supprimé avec succès' });

  } catch (error) {
    console.error(" Erreur lors de la suppression :", error);
    res.status(500).json({ error: 'Erreur lors de la suppression', details: error.message });
  }
};
// Rechercher un utilisateur par email
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query; // Récupérer l'email depuis la requête GET

    if (!email) {
      return res.status(400).json({ error: 'L\'email est requis' });
    }

    const user = await User.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(user);

  } catch (error) {
    console.error(" Erreur lors de la recherche de l'utilisateur :", error);
    res.status(500).json({ error: 'Erreur lors de la recherche', details: error.message });
  }
};
// Obtenir informations utilisateur
exports.getProfile = (req, res) => {
  try {
    res.json({
      userId: req.user.userId,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
};
