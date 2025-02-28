require("dotenv").config();

module.exports = {
    SECRET_KEY: process.env.JWT_SECRET || "secret",
    PORT: process.env.PORT || 3000
};
