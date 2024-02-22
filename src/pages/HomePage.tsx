import Form from "../components/Form";
import MessageBox from "../components/Message";

export default function HomePage() {
  return (
    <>
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
    </>
  );
}
