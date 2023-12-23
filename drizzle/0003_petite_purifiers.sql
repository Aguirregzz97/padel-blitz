ALTER TABLE "category_tournaments" DROP CONSTRAINT "category_tournaments_category_type_id_category_types_id_fk";
--> statement-breakpoint
ALTER TABLE "tournament_admins" DROP CONSTRAINT "tournament_admins_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "owner_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "city_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "address" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "registration_start_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "registration_end_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "tournament_start_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "tournament_end_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_tournaments" ADD CONSTRAINT "category_tournaments_category_type_id_category_types_id_fk" FOREIGN KEY ("category_type_id") REFERENCES "category_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournament_admins" ADD CONSTRAINT "tournament_admins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
