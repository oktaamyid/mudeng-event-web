CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"subtitle" text,
	"category" varchar(255),
	"description" text,
	"image_url" varchar(255),
	"timeline" varchar(255),
	"service" varchar(255),
	"kickoff_date" varchar(255),
	"instructor" varchar(255),
	"duration" varchar(255),
	"overview" jsonb,
	"process" jsonb,
	"result" jsonb,
	"gallery" jsonb,
	"focus" varchar(255),
	"output" varchar(255),
	"faqs" jsonb,
	"form_fields" jsonb,
	"confirmation_message" text,
	"status" varchar(50) DEFAULT 'PUBLISHED' NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"user_id" varchar(255),
	"email" varchar(255) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"answers" jsonb NOT NULL,
	"status" varchar(50) DEFAULT 'PENDING' NOT NULL,
	"registered_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"password_hash" text NOT NULL,
	"role" varchar(50) DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;