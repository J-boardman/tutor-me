import { Elysia, t } from "elysia";
import { sessionMiddleware } from "../middleware/sessions";
import { db } from "../db/db";
import { messages } from "../db/schema";
import { eq } from "drizzle-orm";

const app = new Elysia();

app
  .use(sessionMiddleware)
  .patch(
    "/messages/:id",
    async ({ body, params }) => {
      const [updatedMessage] = await db
        .update(messages)
        .set({ message: body.message })
        .where(eq(messages.id, Number(params.id)))
        .returning();

      console.log(body);

      return <p>{updatedMessage.message}</p>;
    },
    {
      body: t.Object({ message: t.String() }),
    }
  )
  .delete("/messages/:id", async({ params }) => {
    await db.delete(messages).where(eq(messages.id, Number(params.id)));
    return ""
  });

export default app;
