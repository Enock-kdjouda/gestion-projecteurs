const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

const users = [
    { id: 1, username: "student1", role: "student" },
    { id: 2, username: "teacher1", role: "teacher" },
    { id: 3, username: "admin1", role: "admin" }
];

function login(req, res) {
    const { username } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé." });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
}

module.exports = { login };
