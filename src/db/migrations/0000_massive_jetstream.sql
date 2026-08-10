CREATE TABLE `events` (
	`id` varchar(36) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`subtitle` text,
	`category` varchar(255),
	`description` text,
	`image_url` varchar(255),
	`timeline` varchar(255),
	`service` varchar(255),
	`kickoff_date` varchar(255),
	`instructor` varchar(255),
	`duration` varchar(255),
	`overview` json,
	`process` json,
	`result` json,
	`gallery` json,
	`faqs` json,
	`form_fields` json,
	`confirmation_message` text,
	`status` varchar(50) NOT NULL DEFAULT 'PUBLISHED',
	`is_featured` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `events_id` PRIMARY KEY(`id`),
	CONSTRAINT `events_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `registrations` (
	`id` varchar(36) NOT NULL,
	`event_id` varchar(36) NOT NULL,
	`user_id` varchar(255),
	`email` varchar(255) NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`answers` json NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'PENDING',
	`registered_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `registrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255),
	`password_hash` text NOT NULL,
	`role` varchar(50) NOT NULL DEFAULT 'user',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE no action ON UPDATE no action;