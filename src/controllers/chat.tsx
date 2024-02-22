import { Elysia } from "elysia";
import Form from "../components/Form";
import MessageBox from "../components/Message";
import { messages } from "..";

const app = new Elysia()

export type Message = {
  id: string;
  message: string;
  time: Date;
};


app.ws("/ws",  {
  message(ws, message) {
    console.log(message)
    let newMessage: Message = {
      id: ws.id,
      // @ts-expect-error
      message: message?.message as string,
      time: new Date(),
    };
    messages.push(newMessage);
    const UI = ({isAuthor = false} : {isAuthor?: boolean}) => (
      <>
        <Form />
        <div class="container" id="chat_room" hx-swap-oob="beforeend">
          <MessageBox message={newMessage} />
        </div>
      </>
    );
    ws.publish("chat_room", <UI />);
    ws.send(<UI isAuthor={true}/>);
  },
  open(ws) {  
    console.log(`Connected ${ws.id}`);
    ws.subscribe("chat_room");
    ws.publish("chat_room", [ws.id])

  },
  close(ws) {
    console.log(`Disconnected ${ws.id}`);
  },
});

export default app