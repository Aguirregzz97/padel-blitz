import {
  pgTable,
  varchar,
  integer,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(),
  category_type_id: integer("category_id").references(() => category_types.id),
  first_name: varchar("first_name", { length: 256 }).notNull(),
  last_name: varchar("last_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
  gender: varchar("gender", { length: 256 }),
  image_url: varchar("image_url", { length: 2084 }),
  joined_at: timestamp("joined_at"),
  last_sign_in_at: timestamp("last_sign_in_at"),
});

export const category_types = pgTable("category_types", {
  id: serial("id").primaryKey(),
  category_name: varchar("category_name", { length: 256 }),
});
