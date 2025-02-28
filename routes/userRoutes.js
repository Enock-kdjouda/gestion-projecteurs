const express = require("express");
const { getProfile, adminOnly } = require("../controllers/userController");
const { authenticateToken, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authenticateToken, getProfile);
router.get("/admin", authenticateToken, authorizeRoles("admin"), adminOnly);

module.exports = router;
