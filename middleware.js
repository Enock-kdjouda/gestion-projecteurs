const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const users = [
    { id: 1, username: "student1", role: "student" },
    { id: 2, username: "teacher1", role: "teacher" },
    { id: 3, username: "admin1", role: "admin" }
];

const SECRET_KEY = process.env.JWT_SECRET || "secret";

// Middleware d'authentification
function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Token invalide." });
        req.user = user;
        next();
    });
}

// Middleware de gestion des rôles
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès interdit." });
        }
        next();
    };
}

// Route de connexion (génération du token JWT)
app.post("/login", (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé." });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

// Route protégée: Profil utilisateur
app.get("/profile", authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

// Route réservée aux administrateurs
app.get("/admin", authenticateToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Bienvenue, administrateur !" });
});

// Simulation de réservation de projecteur
let projectorsAvailable = 2;
app.post("/reserve-projector", authenticateToken, (req, res) => {
    if (projectorsAvailable > 0) {
        projectorsAvailable--;
        res.json({ message: "Projecteur réservé avec succès." });
    } else {
        res.status(400).json({ message: "Aucun projecteur disponible." });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
