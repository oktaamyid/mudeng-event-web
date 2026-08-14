import {
    mysqlTable,
    varchar,
    text,
    timestamp,
    json,
    boolean,
} from "drizzle-orm/mysql-core";
import { randomUUID } from "crypto";

export const events = mysqlTable("events", {
    id: varchar("id", { length: 36 })
        .$defaultFn(() => randomUUID())
        .primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    subtitle: text("subtitle"),
    category: varchar("category", { length: 255 }),
    description: text("description"),
    imageUrl: varchar("image_url", { length: 255 }),
    timeline: varchar("timeline", { length: 255 }),
    service: varchar("service", { length: 255 }),
    kickoffDate: varchar("kickoff_date", { length: 255 }),
    instructor: varchar("instructor", { length: 255 }),
    duration: varchar("duration", { length: 255 }),
    overview: json("overview"), // { title, description }
    process: json("process"), // { title, description }
    result: json("result"), // { title, description }
    gallery: json("gallery"), // string[]
    focus: varchar("focus", { length: 255 }),
    output: varchar("output", { length: 255 }),
    faqs: json("faqs"), // { question, answer }[]
    formFields: json("form_fields"), // Dynamic form configuration
    confirmationMessage: text("confirmation_message"), // Custom success message
    status: varchar("status", { length: 50 }).default("PUBLISHED").notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const registrations = mysqlTable("registrations", {
    id: varchar("id", { length: 36 })
        .$defaultFn(() => randomUUID())
        .primaryKey(),
    eventId: varchar("event_id", { length: 36 })
        .references(() => events.id)
        .notNull(),
    userId: varchar("user_id", { length: 255 }),

    // Core Info
    email: varchar("email", { length: 255 }).notNull(),
    fullName: varchar("full_name", { length: 255 }).notNull(),

    // Dynamic Answers
    answers: json("answers").notNull(),

    // Meta
    status: varchar("status", { length: 50 }).default("PENDING").notNull(),
    registeredAt: timestamp("registered_at").defaultNow().notNull(),
});

export const users = mysqlTable("users", {
    id: varchar("id", { length: 36 })
        .$defaultFn(() => randomUUID())
        .primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    passwordHash: text("password_hash").notNull(),
    role: varchar("role", { length: 50 }).default("user").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
