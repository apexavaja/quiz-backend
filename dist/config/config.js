"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const DB_URLSTRING = process.env.DB_URL || "mysql://hrana:" + encodeURIComponent('Hirenr@n@') + "@35.187.243.47:3306/quizApp";
const CONFIG = {
    APP: process.env.APP || 'development',
    PORT: process.env.PORT || '8000',
    DB_URL: process.env.DB_URL || DB_URLSTRING,
    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'jwt_secrete_key',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
    SHA_KEY: process.env.SHA_KEY || 'sha_secrete_key'
};
exports.default = CONFIG;
//# sourceMappingURL=config.js.map