import {
  mysqlTable,
  serial,
  varchar,
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

export const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  category_name: varchar("category_name", { length: 256 }),
});
