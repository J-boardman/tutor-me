import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import chatService from "./controllers/chat";
import HomePage from "./pages/HomePage";

const app = new Elysia();

app.use(html());
app.use(staticPlugin());
app.get("/", () => <HomePage />);
app.use(chatService);

app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
