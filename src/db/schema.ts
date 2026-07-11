import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    jsonb,
    boolean,
} from "drizzle-orm/pg-core";

export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),
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
    overview: jsonb("overview"), // { title, description }
    process: jsonb("process"), // { title, description }
    result: jsonb("result"), // { title, description }
    gallery: jsonb("gallery"), // string[]
    faqs: jsonb("faqs"), // { question, answer }[]
    formFields: jsonb("form_fields"), // Dynamic form configuration
    status: varchar("status", { length: 50 }).default("PUBLISHED").notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const registrations = pgTable("registrations", {
    id: uuid("id").defaultRandom().primaryKey(),
    eventId: uuid("event_id")
        .references(() => events.id)
        .notNull(),
    userId: varchar("user_id", { length: 255 }),

    // Core Info
    email: varchar("email", { length: 255 }).notNull(),
    fullName: varchar("full_name", { length: 255 }).notNull(),

    // Dynamic Answers
    answers: jsonb("answers").notNull(),

    // Meta
    status: varchar("status", { length: 50 }).default("PENDING").notNull(),
    registeredAt: timestamp("registered_at").defaultNow().notNull(),
});
