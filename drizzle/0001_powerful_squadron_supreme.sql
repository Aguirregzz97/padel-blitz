CREATE TABLE IF NOT EXISTS "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"state_id" integer,
	"name" varchar(2566)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "states" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournaments" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" varchar(256) NOT NULL,
	"city_id" integer NOT NULL,
	"name" varchar(256) NOT NULL,
	"address" varchar(256) NOT NULL,
	"banner_url" varchar(256),
	"registration_start_at" timestamp NOT NULL,
	"registration_end_at" timestamp NOT NULL,
	"tournament_start_at" timestamp NOT NULL,
	"tournament_end_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "states" ADD CONSTRAINT "states_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
