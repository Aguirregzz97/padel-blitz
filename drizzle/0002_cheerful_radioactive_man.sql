CREATE TABLE IF NOT EXISTS "category_tournaments" (
	"category_type_id" integer NOT NULL,
	"tournament_id" integer NOT NULL,
	CONSTRAINT category_tournaments_category_type_id_tournament_id_pk PRIMARY KEY("category_type_id","tournament_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournament_admins" (
	"user_id" varchar(256) NOT NULL,
	"tournament_id" integer NOT NULL,
	CONSTRAINT tournament_admins_user_id_tournament_id_pk PRIMARY KEY("user_id","tournament_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_tournaments" ADD CONSTRAINT "category_tournaments_category_type_id_category_types_id_fk" FOREIGN KEY ("category_type_id") REFERENCES "category_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_tournaments" ADD CONSTRAINT "category_tournaments_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournament_admins" ADD CONSTRAINT "tournament_admins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournament_admins" ADD CONSTRAINT "tournament_admins_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
