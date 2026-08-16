import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

// Use a dummy URL during build if DATABASE_URL is missing, 
// so the Next.js build doesn't crash during static analysis/module loading.
const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@dummy/dummy";

if (!process.env.DATABASE_URL) {
    console.warn("⚠️ DATABASE_URL is not defined. Using dummy connection for build time.");
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
