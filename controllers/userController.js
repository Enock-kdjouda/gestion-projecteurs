function getProfile(req, res) {
    res.json({ user: req.user });
}

function adminOnly(req, res) {
    res.json({ message: "Bienvenue, administrateur !" });
}

module.exports = { getProfile, adminOnly };
