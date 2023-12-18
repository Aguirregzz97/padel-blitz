CREATE TABLE IF NOT EXISTS "category_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"category_id" integer,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(256) NOT NULL,
	"gender" varchar(256),
	"image_url" varchar(2084),
	"joined_at" timestamp,
	"last_sign_in_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_category_id_category_types_id_fk" FOREIGN KEY ("category_id") REFERENCES "category_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
