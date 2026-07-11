import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function drop() {
  await sql`DROP TABLE IF EXISTS registrations CASCADE`;
  console.log("Registrations dropped");
  process.exit(0);
}
drop();
