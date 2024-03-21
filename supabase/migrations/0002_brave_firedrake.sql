CREATE TABLE IF NOT EXISTS "messages" (
	"message_id" uuid PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"message_created_timestamp" timestamp with time zone NOT NULL,
	"sender_user_id" uuid,
	"recipient_user_id" uuid NOT NULL,
	"has_been_displayed" boolean DEFAULT false,
	"last_displayed_timestamp" timestamp with time zone,
	"is_liked" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social_auths" (
	"auth_id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"provider" text NOT NULL,
	"provider_user_id" text NOT NULL,
	CONSTRAINT "social_auths_provider_user_id_unique" UNIQUE("provider_user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_links" (
	"user_id" uuid,
	"friend_user_id" uuid,
	CONSTRAINT "user_links_user_id_friend_user_id_pk" PRIMARY KEY("user_id","friend_user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password_hash" text,
	"status" text,
	"is_paid_user" boolean DEFAULT false,
	"current_inbox_url" text NOT NULL,
	"previous_inbox_url" text,
	"previous_url_expiry" timestamp with time zone,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_current_inbox_url_unique" UNIQUE("current_inbox_url")
);
--> statement-breakpoint
DROP TABLE "user";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_user_id_users_user_id_fk" FOREIGN KEY ("sender_user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_recipient_user_id_users_user_id_fk" FOREIGN KEY ("recipient_user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "social_auths" ADD CONSTRAINT "social_auths_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_links" ADD CONSTRAINT "user_links_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_links" ADD CONSTRAINT "user_links_friend_user_id_users_user_id_fk" FOREIGN KEY ("friend_user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
