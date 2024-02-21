import { Message } from "..";

export default function MessageBox({ message }: { message: Message }) {
  return (
      <article>
        <header>
          <span>{message.id}</span>
          <span>
            {new Intl.DateTimeFormat("en-au", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(message.time)}
          </span>
        </header>
        <p>{message.message}</p>
      </article>
  );
}
