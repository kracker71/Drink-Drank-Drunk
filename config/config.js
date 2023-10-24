const dotenv = require("dotenv");

dotenv.config();

const appConfig = {
    NODE_ENV: process.env.NODE_ENV || "development", 
    PORT: process.env.PORT || 8102,
    MONGO_URI: process.env.MONGO_URI,
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT || 5432,
};

module.exports = appConfig;