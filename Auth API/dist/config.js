import dotenv from "dotenv";
dotenv.config();
export const { SECRET_JWT_KEY = "", PORT = 3000, DB_API_URL = "", } = process.env;
