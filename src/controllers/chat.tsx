import { Elysia } from "elysia";
import Form from "../components/Form";
import MessageBox from "../components/Message";
import { NewMessage, messages, users } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { sessionMiddleware } from "../middleware/sessions";

const app = new Elysia();

app.use(sessionMiddleware)
  .ws("/ws", {
  async message(ws, message) {
    let newMessage: NewMessage = {
      // @ts-expect-error
      message: message?.message as string,
      sent_at: new Date().toISOString(),
      from_user: Number(ws.data.session?.userId),
    };

    const [savedMessage] = await db
      .insert(messages)
      .values(newMessage)
      .returning()

    const [author] = await db.select().from(users).where(eq(users.id, savedMessage.from_user))

    const finalMessage = {
      message: {...savedMessage},
      user: {...author}
    }

    const UI = ({ isAuthor = false }: { isAuthor?: boolean }) => (
      <>
        <Form />
        <div class="container" id="chat_room" hx-swap-oob="beforeend">
          <MessageBox message={finalMessage} currentUserId={Number(ws.data.session?.userId)}/>
        </div>
      </>
    );
    ws.publish("chat_room", <UI />);
    ws.send(<UI isAuthor={true} />);
  },
  open(ws) {
    console.log(`Connected ${ws.id}`);
    ws.subscribe("chat_room");
    ws.publish("chat_room", [ws.id]);
  },
  close(ws) {
    console.log(`Disconnected ${ws.id}`);
  },
  
});

export default app;
