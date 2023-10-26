import app from "./app.js"
import config from "./config/config.js"
import { SyncDatabase } from "./repository/database.js"

main();

async function main(){
    await SyncDatabase();

    app.listen(config.port || 8101, () =>
        console.log(`🚀 Server has listening on ${config.backend_url || "localhost"}:${config.port || 8101}`)
    )
}