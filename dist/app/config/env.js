"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const loadEnvVariables = () => {
    const requiredEnvVariables = ["PORT", "DATABASE_URL", "BCRYPT_SALT_ROUND", "JWT_ACCESS_SECRET", "JWT_ACCESS_EXPIRES", "ADMIN_EMAIL", "ADMIN_PASSWORD", "ADMIN_NAME", "FRONTEND_URL"];
    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require env variable ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        DATABASE_URL: process.env.DATABASE_URL,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        ADMIN_NAME: process.env.ADMIN_NAME,
        FRONTEND_URL: process.env.FRONTEND_URL
    };
};
exports.envVars = loadEnvVariables();
