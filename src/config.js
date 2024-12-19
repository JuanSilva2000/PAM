import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const PASSWORD = process.env.PASSWORD
// || "password";

export const DB_NAME = process.env.DB_NAME