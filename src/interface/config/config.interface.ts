import { NODE_ENV } from "../../types"

export interface IAppConfig {
    NODE_ENV: NODE_ENV,
    PORT: number,
    MONGO_URI: string,
    DB_HOST: string,
    DB_USER: string
    DB_NAME: string,
    DB_PASS: string,
    DB_PORT: number,
    JWT_SECRET: string,
}