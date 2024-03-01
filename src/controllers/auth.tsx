import { Elysia, t } from "elysia";
import { db, lucia } from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import LogoutButton from "../components/auth/LogoutButton";
import { sessionMiddleware } from "../middleware/sessions";

const app = new Elysia()
  .use(sessionMiddleware)
  .get("/sign-in", () => <SignInPage />)
  .get("/sign-up", () => <SignUpPage />)
  .post(
    "/sign-in",
    async ({ headers, body, set }) => {
      const [foundUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, body.email));

      if (!foundUser) {
        return "not found";
      }

      const matchingPasswords = await Bun.password.verify(body.password, foundUser.password)
      if (!matchingPasswords) {
        return "invalid password";
      }

      try {
        const session = await lucia.createSession(foundUser.id.toString(), {});
        await lucia.validateSession(session.id);
        const sessionCookie = lucia.createSessionCookie(session.id);
        set.headers["Set-Cookie"] = sessionCookie.serialize();
      } catch (error) {
        console.log(error);
      }

      set.headers["HX-Redirect"] = "/";

      return <LogoutButton />;
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    "/sign-up",
    async ({ session, set, body }) => {
      const [foundUser] = await db
        .select({ email: users.email })
        .from(users)
        .where(eq(users.email, body.email));

      if (foundUser) {
        return "User already exists";
      }

      const hashedPassword = await Bun.password.hash(body.password);

      const [userRegistered] = await db
        .insert(users)
        .values({ ...body, password: hashedPassword })
        .returning();

      if (!userRegistered) {
        return "Error creating user";
      }

      try {
        const session = await lucia.createSession(
          userRegistered.id.toString(),
          {}
        );
        await lucia.validateSession(session.id);
        const sessionCookie = lucia.createSessionCookie(session.id);
        set.headers["Set-Cookie"] = sessionCookie.serialize();
      } catch (error) {
        console.log(error);
      }

      set.headers["HX-Redirect"] = "/";

      return <LogoutButton />;
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String({ format: "email" }),
        password: t.String(),
      }),
    }
  )
  .post("/sign-out", async ({ session, set }) => {
    if (!session) {
      return <p>session not found</p>;
    }
    await lucia.invalidateSession(session.id);

    set.headers["HX-Redirect"] = "/";
    set.redirect = "/sign-in";
    return <SignInPage />;
  });

export default app;
