import { db } from "./db";
import { NewUser, users } from "./schema";

const adminUser: NewUser = {
  email: process.env.EMAIL,
  name: process.env.NAME,
  password: process.env.PASSWORD,
  role: "admin",
};

await db.insert(users).values(adminUser);
