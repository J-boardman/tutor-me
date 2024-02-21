import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import BaseHTML from "./components/BaseHTML";
import Form from "./components/Form";
import MessageBox from "./components/Message";

const app = new Elysia();

export type Message = {
  id: string;
  message: string;
  time: Date;
};

let chat: Message[] = [];

app.use(html());
app.use(staticPlugin());
app.ws("/ws", {
  message(ws, message) {
    let newMessage: Message = {
      id: ws.id,
      // @ts-expect-error
      message: message?.message as string,
      time: new Date(),
    };
    chat.push(newMessage);
    const ui = (
      <>
        <Form />
        <div class="container" id="chat_room" hx-swap-oob="beforeend">
          <MessageBox message={newMessage} />
        </div>
      </>
    );
    ws.publish("chat_room", ui);
    ws.send(ui);
  },
  open(ws) {
    console.log(`Connected ${ws.id}`);
    ws.subscribe("chat_room");
  },
  close(ws) {
    console.log(`Disconnected ${ws.id}`);
  },
});
app.get("/", () => <BaseHTML chat={chat} />);

app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
