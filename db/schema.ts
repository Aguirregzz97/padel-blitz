import {
  mysqlTable,
  serial,
  varchar,
  int,
  datetime,
  mysqlEnum,
  timestamp,
} from "drizzle-orm/mysql-core";

// export const tournaments = mysqlTable("tournaments", {
//   id: serial("id").autoincrement(),
//   owner_id: varchar("owner_id", { length: 256 }),
//   name: varchar("name", { length: 256 }),
//   country: varchar("country", { length: 256 }),
//   city: varchar("city", { length: 256 }),
//   address: varchar("city", { length: 256 }),
//   banner_url: varchar("banner", { length: 2084 }),
//   categories: mysqlEnum("categories", [
//     "Primera",
//     "Segunda",
//     "Tercera",
//     "Cuarta",
//     "Quinta",
//     "Sexta",
//     "Septima",
//     "Octava",
//   ]),
//   created_at: timestamp("created_at").defaultNow(),
//   updated_at: timestamp("updated_at").defaultNow(),
// });

// export const users = mysqlTable("users", {
//   id: varchar("id", { length: 256 }).primaryKey(),
//   category_type_id: int("category_id").references(() => category_types.id),
//   first_name: varchar("first_name", { length: 256 }).notNull(),
//   last_name: varchar("last_name", { length: 256 }).notNull(),
//   phone: varchar("phone", { length: 256 }).notNull(),
//   gender: varchar("gender", { length: 256 }),
//   image_url: varchar("image_url", { length: 2084 }),
//   joined_at: datetime("joined_at"),
//   last_sign_in_at: datetime("last_sign_in_at"),
// });

export const category_types = mysqlTable("category_types", {
  id: serial("id").primaryKey(),
  category_name: varchar("category_name", { length: 256 }),
});
