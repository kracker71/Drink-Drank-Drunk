import { DataSource } from "typeorm";
import appConfig from "../../config/config";
import User from "@src/database/postgresql/schema/user.schema";

const postgresDataSource = new DataSource({
  type: "postgres",
  host: appConfig.DB_HOST,
  port: appConfig.DB_PORT,
  username: appConfig.DB_USER,
  password: appConfig.DB_PASS,
  database: appConfig.DB_NAME,
  synchronize: true,
  entities: [User],
});

const pgConnect = () => {
  postgresDataSource
    .initialize()
    .then(() => {
      console.log("Postgres Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
};

const userRepository = postgresDataSource.getRepository(User);

export { userRepository, pgConnect };
