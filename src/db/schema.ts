import { text, sqliteTable, int } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique(),
  name: text("name"),
  student_id: text("student_id").unique(),
  role: text("role", { enum: ["student", "teacher", "admin"] }),
  password: text("password"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const messages = sqliteTable("messages", {
  id: int("id").primaryKey({ autoIncrement: true }),
  message: text("message"),
  from_user: int("from_user"),
  sent_at: text("sent_at"),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
