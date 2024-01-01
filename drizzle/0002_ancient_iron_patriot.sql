DO $$ BEGIN
 CREATE TYPE "playoff_type" AS ENUM('dieciseisavos', 'octavos', 'cuartos', 'semifinales', 'final');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id_1" integer,
	"team_id_2" integer,
	"category_tournament_id" integer,
	"playoff_type" "playoff_type",
	"team_1_score_1" integer,
	"team_1_score_2" integer,
	"team_1_score_3" integer,
	"team_2_score_1" integer,
	"team_2_score_2" integer,
	"team_2_score_3" integer,
	"court" varchar(256),
	"played_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_team_id_1_teams_id_fk" FOREIGN KEY ("team_id_1") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_team_id_2_teams_id_fk" FOREIGN KEY ("team_id_2") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_category_tournament_id_category_tournaments_id_fk" FOREIGN KEY ("category_tournament_id") REFERENCES "category_tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
