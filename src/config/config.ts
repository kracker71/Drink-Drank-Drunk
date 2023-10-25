import { IAppConfig } from '@src/interface/config/config.interface';

const appConfig: IAppConfig = {
    NODE_ENV: process.env.ENV, 
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT,
    JWT_SECRET: process.env.JWT_SECRET,
};

export default appConfig;