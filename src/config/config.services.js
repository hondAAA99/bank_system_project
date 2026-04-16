import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve("./src/config/devolopment.env") });

export const PORT = process.env.port;
export const DB_URI = process.env.DB_URI;
export const DB_NAME = process.env.DB_NAME;
export const SALT = Number(process.env.SALT);
export const SECRET_USER_REFRESH_TOKEN = process.env.SECRET_USER_REFRESH_TOKEN;
export const SECRET_USER_ACCESS_TOKEN = process.env.SECRET_USER_ACCESS_TOKEN;
export const TOKEN_PREFIX = process.env.TOKEN_PREFIX;
