import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.DATABASE_HOST || "",
    user: process.env.DATABASE_USERNAME || "",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "",
    port: Number(process.env.DATABASE_PORT) || 5432,
  },
} satisfies Config;
