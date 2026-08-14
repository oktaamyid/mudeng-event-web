import { config } from "dotenv";
config({ path: ".env" });

import mysql from "mysql2/promise";

async function drop() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    await connection.execute("DROP TABLE IF EXISTS registrations");
    console.log("Registrations dropped");
    await connection.execute("DROP TABLE IF EXISTS events");
    console.log("Events dropped");
    await connection.execute("DROP TABLE IF EXISTS users");
    console.log("Users dropped");
    await connection.end();
    process.exit(0);
}
drop();
