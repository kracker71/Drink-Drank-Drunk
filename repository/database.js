import { DataSource} from "typeorm"
import config from "../config/config.js"

const env = config.project_env? config.project_env : "development"

console.log(`This server is run on ${env} environment`)

const typeorm = new DataSource({
    type: "postgres",
    host: config.db_host,
    port: config.db_port,
    username: config.db_user,
    password: config.db_pass,
    database: config.db_name,
    synchronize: true,
    entities: [UserSchemas],
})

export async function SyncDatabase(){
    try{
        await db.typeorm.initialize()
    }catch(err){
        console.log(`Unable to connect database with error ${err}`);
    }

    console.log("Successfully connected to database.");

    try{
        db.typeorm.synchronize()
    }catch(err){
        console.log(`Unable to sync database with error ${err}`)
    }

    console.log("Successfully sync database");
}

const db = {}

import UserSchemas from "./entity/user.schema.js"
db.typeorm = typeorm

export default db