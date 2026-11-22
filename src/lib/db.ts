import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

// Use a dummy URL during build if DATABASE_URL is missing,
// so the Next.js build doesn't crash during static analysis/module loading.
const connectionString =
    process.env.DATABASE_URL || "postgres://dummy:dummy@dummy/dummy";

if (!process.env.DATABASE_URL) {
    console.warn(
        "⚠️ DATABASE_URL is not defined. Using dummy connection for build time.",
    );
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

const globalForSchema = globalThis as unknown as {
    __mudengSchemaReady?: Promise<void>;
};

/**
 * Ensures newly added columns and tables exist on any target database
 * (e.g. production deployments that do not run drizzle-kit push manually).
 */
export async function ensureSchema(): Promise<void> {
    if (!process.env.DATABASE_URL) return;

    if (!globalForSchema.__mudengSchemaReady) {
        globalForSchema.__mudengSchemaReady = (async () => {
            try {
                await sql`ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "version" integer NOT NULL DEFAULT 1`;
                await sql`ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "updated_at" timestamp NOT NULL DEFAULT now()`;
                await sql`ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "email_subject" varchar(255)`;
                await sql`ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "email_body" text`;
                await sql`ALTER TABLE "registrations" ADD COLUMN IF NOT EXISTS "version" integer NOT NULL DEFAULT 1`;
                await sql`ALTER TABLE "registrations" ADD COLUMN IF NOT EXISTS "email_status" varchar(30) NOT NULL DEFAULT 'NOT_SENT'`;
                await sql`ALTER TABLE "registrations" ADD COLUMN IF NOT EXISTS "email_sent_at" timestamp`;
                await sql`ALTER TABLE "registrations" ADD COLUMN IF NOT EXISTS "email_error" text`;
                await sql`ALTER TABLE "registrations" ADD COLUMN IF NOT EXISTS "resend_email_id" varchar(255)`;
                await sql`CREATE TABLE IF NOT EXISTS "site_content" ("key" varchar(100) PRIMARY KEY NOT NULL, "data" jsonb NOT NULL, "updated_at" timestamp DEFAULT now() NOT NULL)`;
            } catch (err) {
                globalForSchema.__mudengSchemaReady = undefined;
                throw err;
            }
        })();
    }

    return globalForSchema.__mudengSchemaReady;
}
