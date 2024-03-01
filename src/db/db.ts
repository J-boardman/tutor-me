import { Database } from "bun:sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { BunSQLiteAdapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite);

export const adapter = new BunSQLiteAdapter(sqlite, {
  user: "user",
  session: "session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

await migrate(db, { migrationsFolder: "./src/db/migrations" });
