import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import BaseHTML from "./components/BaseHTML";
import chatService from "./controllers/chat"

const app = new Elysia();

export type Message = {
  id: string;
  message: string;
  time: Date;
};

app.use(html());
app.use(staticPlugin());
app.get("/", () => <BaseHTML />);
app.use(chatService)

app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
