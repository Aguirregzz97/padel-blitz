import {
  pgTable,
  varchar,
  integer,
  timestamp,
  serial,
  primaryKey,
  pgEnum,
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
  team_player_1: many(teams, { relationName: "team_player1" }),
  team_player_2: many(teams, { relationName: "team_player2" }),
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

export const category_tournaments = pgTable("category_tournaments", {
  id: serial("id").primaryKey(),
  category_type_id: integer("category_type_id")
    .references(() => category_types.id, { onDelete: "cascade" })
    .notNull(),
  tournament_id: integer("tournament_id")
    .references(() => tournaments.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const categoryTournamentsRelations = relations(
  category_tournaments,
  ({ one, many }) => ({
    category: one(category_types, {
      fields: [category_tournaments.category_type_id],
      references: [category_types.id],
    }),
    tournament: one(tournaments, {
      fields: [category_tournaments.tournament_id],
      references: [tournaments.id],
    }),
    teams: many(teams),
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

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const groupRelations = relations(groups, ({ many }) => ({
  teams: many(teams),
}));

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  user_id_1: varchar("user_id_1", { length: 256 }).references(() => users.id),
  user_id_2: varchar("user_id_2", { length: 256 }).references(() => users.id),
  category_tournament_id: integer("category_tournament_id").references(
    () => category_tournaments.id,
  ),
  group_id: integer("group_id").references(() => groups.id),
});

export const teamsRelations = relations(teams, ({ one, many }) => ({
  player_1: one(users, {
    fields: [teams.user_id_1],
    references: [users.id],
    relationName: "team_player1",
  }),
  player_2: one(users, {
    fields: [teams.user_id_2],
    references: [users.id],
    relationName: "team_player2",
  }),
  category_tournament: one(category_tournaments, {
    fields: [teams.category_tournament_id],
    references: [category_tournaments.id],
  }),
  group: one(groups, {
    fields: [teams.group_id],
    references: [groups.id],
  }),
  team_1_games: many(games, { relationName: "team_1" }),
  team_2_games: many(games, { relationName: "team_2" }),
}));

export const playoffTypeEnum = pgEnum("playoff_type", [
  "dieciseisavos",
  "octavos",
  "cuartos",
  "semifinales",
  "final",
]);

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  team_id_1: integer("team_id_1").references(() => teams.id),
  team_id_2: integer("team_id_2").references(() => teams.id),
  category_tournament_id: integer("category_tournament_id").references(
    () => category_tournaments.id,
  ),
  playoff_type: playoffTypeEnum("playoff_type"),
  team_1_score_1: integer("team_1_score_1"),
  team_1_score_2: integer("team_1_score_2"),
  team_1_score_3: integer("team_1_score_3"),
  team_2_score_1: integer("team_2_score_1"),
  team_2_score_2: integer("team_2_score_2"),
  team_2_score_3: integer("team_2_score_3"),
  court: varchar("court", { length: 256 }),
  played_at: timestamp("played_at"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const gamesRelations = relations(games, ({ one }) => ({
  team_1: one(teams, {
    fields: [games.team_id_1],
    references: [teams.id],
    relationName: "team_1",
  }),
  team_2: one(teams, {
    fields: [games.team_id_2],
    references: [teams.id],
    relationName: "team_2",
  }),
  category_tournament: one(category_tournaments, {
    fields: [games.category_tournament_id],
    references: [category_tournaments.id],
  }),
}));
