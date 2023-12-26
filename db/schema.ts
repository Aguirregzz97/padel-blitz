import {
  pgTable,
  varchar,
  integer,
  timestamp,
  serial,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(),
  category_type_id: integer("category_id").references(() => category_types.id),
  first_name: varchar("first_name", { length: 256 }),
  last_name: varchar("last_name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  gender: varchar("gender", { length: 256 }),
  image_url: varchar("image_url", { length: 2084 }),
  joined_at: timestamp("joined_at"),
  last_sign_in_at: timestamp("last_sign_in_at"),
});

export const userRelations = relations(users, ({ many, one }) => ({
  admin_tournaments: many(tournament_admins),
  category_type: one(category_types, {
    fields: [users.category_type_id],
    references: [category_types.id],
  }),
  tournaments_owned: many(tournaments),
}));

export const category_types = pgTable("category_types", {
  id: serial("id").primaryKey(),
  category_name: varchar("category_name", { length: 256 }),
});

export const categoryTypeRelations = relations(category_types, ({ many }) => ({
  tournament_categories: many(category_tournaments),
  users: many(users),
}));

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const countriesRelations = relations(countries, ({ many }) => ({
  states: many(states),
}));

export const states = pgTable("states", {
  id: serial("id").primaryKey(),
  country_id: integer("country_id").references(() => countries.id),
  name: varchar("name", { length: 256 }),
});

export const statesRelations = relations(states, ({ one, many }) => ({
  country: one(countries, {
    fields: [states.country_id],
    references: [countries.id],
  }),
  cities: many(cities),
}));

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  state_id: integer("state_id").references(() => states.id),
  name: varchar("name", { length: 2566 }),
});

export const citiesRelations = relations(cities, ({ one, many }) => ({
  state: one(states, { fields: [cities.state_id], references: [states.id] }),
  tournaments: many(tournaments),
}));

export const tournaments = pgTable("tournaments", {
  id: serial("id").primaryKey(),
  owner_id: varchar("owner_id", { length: 256 }).references(() => users.id),
  city_id: integer("city_id").references(() => cities.id),
  name: varchar("name", { length: 256 }),
  address: varchar("address", { length: 256 }),
  banner_url: varchar("banner_url", { length: 256 }),
  registration_start_at: timestamp("registration_start_at"),
  registration_end_at: timestamp("registration_end_at"),
  tournament_start_at: timestamp("tournament_start_at"),
  tournament_end_at: timestamp("tournament_end_at"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const tournamentRelations = relations(tournaments, ({ many, one }) => ({
  categories: many(category_tournaments),
  admins: many(tournament_admins),
  owner: one(users, { fields: [tournaments.owner_id], references: [users.id] }),
  city: one(cities, { fields: [tournaments.city_id], references: [cities.id] }),
}));

export const category_tournaments = pgTable(
  "category_tournaments",
  {
    category_type_id: integer("category_type_id")
      .references(() => category_types.id, { onDelete: "cascade" })
      .notNull(),
    tournament_id: integer("tournament_id")
      .references(() => tournaments.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.category_type_id, table.tournament_id],
      }),
    };
  },
);

export const categoryTournamentsRelations = relations(
  category_tournaments,
  ({ one }) => ({
    category: one(category_types, {
      fields: [category_tournaments.category_type_id],
      references: [category_types.id],
    }),
    tournament: one(tournaments, {
      fields: [category_tournaments.tournament_id],
      references: [tournaments.id],
    }),
  }),
);

export const tournament_admins = pgTable(
  "tournament_admins",
  {
    user_id: varchar("user_id", { length: 256 })
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    tournament_id: integer("tournament_id")
      .references(() => tournaments.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.user_id, table.tournament_id],
      }),
    };
  },
);

export const tournamentAdminRelations = relations(
  tournament_admins,
  ({ one }) => ({
    tournament: one(tournaments, {
      fields: [tournament_admins.tournament_id],
      references: [tournaments.id],
    }),
    user: one(users, {
      fields: [tournament_admins.user_id],
      references: [users.id],
    }),
  }),
);
