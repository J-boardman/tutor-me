import { Message } from "..";
import Form from "./Form";
import MessageBox from "./Message";

export default function BaseHTML({ chat }: { chat: Message[] }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />

        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />
        <script src="/public/script.js" defer></script>
        <link rel="stylesheet" href="/public/index.css" />
        <title>Document</title>
      </head>
      <body>
        <aside>
          <hgroup>
            <h2>Chat room</h2>
            <h4>Please be polite!</h4>
          </hgroup>
          {/* <form hx-post="/username">
            <fieldset role="group">
              <input type="text" name="username" placeholder="Set username"/>
              <input type="submit" value="Set" />
            </fieldset>
          </form> */}
        </aside>
        <div>
          <div hx-ext="ws" ws-connect="/ws">
            <div id="chat_room">
              {chat.map((message) => (
                <MessageBox message={message} />
              ))}
            </div>
            <Form />
          </div>
        </div>
      </body>
    </html>
  );
}
