import { UserInterface } from "../interface/user/user.interface";

export {}

export type NODE_ENV = "production" | "staging" | "development";

interface IEnv {
  PORT: number;
  ENV: NODE_ENV;
  MONGO_URI: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASS: string;
  DB_PORT: number;
  JWT_SECRET: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: UserInterface;
      token?: string;
    }
  }

  namespace NodeJS {
    interface ProcessEnv extends IEnv {
      [key: string]: string | undefined;
    }
  }

  namespace jwt {
      export interface JwtPayload {
        id: string;
      }
  }
}

declare module "bun" {
  interface Env extends IEnv {
    [key: string]: string | undefined;
  }
}