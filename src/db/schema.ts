import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 255 }),
  timeline: varchar("timeline", { length: 255 }),
  service: varchar("service", { length: 255 }),
  kickoffDate: varchar("kickoff_date", { length: 255 }),
  status: varchar("status", { length: 50 }).default("PUBLISHED").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const registrations = pgTable("registrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id").references(() => events.id).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  
  // Registration Form Fields
  email: varchar("email", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  institution: varchar("institution", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 50 }).notNull(),
  source: varchar("source", { length: 255 }).notNull(),
  experience: varchar("experience", { length: 255 }).notNull(),
  tools: varchar("tools", { length: 255 }).notNull(),
  expectations: text("expectations").notNull(),
  commitment: varchar("commitment", { length: 50 }).notNull(),
  description: text("description"),
  
  // Meta
  status: varchar("status", { length: 50 }).default("PENDING").notNull(),
  registeredAt: timestamp("registered_at").defaultNow().notNull(),
});
