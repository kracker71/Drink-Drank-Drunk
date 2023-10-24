const dotenv = require("dotenv");

dotenv.config();

const appConfig = {
    NODE_ENV: process.env.NODE_ENV || "development", 
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 8102,
};

module.exports = appConfig;