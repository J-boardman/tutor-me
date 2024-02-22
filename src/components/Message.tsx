import { Message } from "../db/schema";

export default function MessageBox({ message }: { message: Message }) {
  return (
      <article>
        <header>
          <span>{message.from_user}</span>
          <span>
            {new Intl.DateTimeFormat("en-au", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(message.sent_at as string))}
          </span>
        </header>
        <p>{message.message}</p>
      </article>
  );
}
