import BaseHTML from "../components/BaseHTML";
import Form from "../components/Form";
import MessageBox from "../components/Message";
import { db } from "../db/db";
import { Message, messages } from "../db/schema";

export default async function HomePage() {
  const messageList: Message[] = await db.select().from(messages).execute()

  return (
    <BaseHTML>
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
            {messageList.map((message) => (
              <MessageBox message={message} />
            ))}
          </div>
          <Form />
        </div>
      </div>
    </BaseHTML>
  );
}
