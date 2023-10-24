import { DataSource } from "typeorm";
import UserSchemas from "./entity/user.schema.js";
import appConfig from "../../config/config.js";

const typeorm = new DataSource({
  type: appConfig.DB_TYPE,
  host: appConfig.DB_HOST,
  port: appConfig.DB_PORT,
  username: appConfig.DB_USER,
  password: appConfig.DB_PASS,
  database: appConfig.DB_NAME,
  synchronize: true,
  entities: [UserSchemas],
});

export const SyncDatabase = async () => {
  try {
    await typeorm.initialize();
  } catch (err) {
    console.log(`Unable to connect database with error ${err}`);
  }
  console.log("Successfully connected to database.");
  try {
    typeorm.synchronize();
  } catch (err) {
    console.log(`Unable to sync database with error ${err}`);
  }
  console.log("Successfully sync database");
}

export default typeorm;
