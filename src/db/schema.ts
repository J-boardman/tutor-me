import { text, sqliteTable, int, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email"),
  password: text("password"),
});

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  from_user: int("id").references(() => users.id),
  sent_at: integer("sent_at", { mode: "timestamp" }),
});

export type Message = typeof messages.$inferSelect
export type NewMessage = typeof messages.$inferInsert