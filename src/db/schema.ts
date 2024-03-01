import { text, sqliteTable, int } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: int("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  student_id: text("student_id").unique(),
  role: text("role", { enum: ["student", "teacher", "admin"] })
    .notNull()
    .default("student"),
  password: text("password").notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const messages = sqliteTable("message", {
  id: int("id").primaryKey({ autoIncrement: true }),
  message: text("message").notNull(),
  from_user: int("from_user")
    .references(() => users.id)
    .notNull(),
  sent_at: text("sent_at").notNull().default(String(new Date())),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey().notNull(),
  expires_at: int("expires_at").notNull(),
  user_id: int("user_id").references(() => users.id),
});
