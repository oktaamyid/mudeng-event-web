import { config } from "dotenv";
config({ path: ".env" });

import { neon } from "@neondatabase/serverless";

async function drop() {
    const sql = neon(process.env.DATABASE_URL!);
    
    await sql`DROP TABLE IF EXISTS registrations`;
    console.log("Registrations dropped");
    
    await sql`DROP TABLE IF EXISTS events CASCADE`;
    console.log("Events dropped");
    
    await sql`DROP TABLE IF EXISTS users`;
    console.log("Users dropped");
    
    process.exit(0);
}
drop();
