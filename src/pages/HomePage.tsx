import { Session } from "lucia";
import BaseHTML from "../components/BaseHTML";
import Form from "../components/Form";
import MessageBox from "../components/Message";
import SignInForm from "../components/SignInForm";
import { db } from "../db/db";
import { Message, User, messages, users } from "../db/schema";
import LogoutButton from "../components/auth/LogoutButton";
import { eq } from "drizzle-orm";


export interface MessageWithUser {
  message: Message
  user: User | null
}

export default async function HomePage({
  session,
}: {
  session: Session | null;
}) {
  const messageList: MessageWithUser[] = await db.select().from(messages).leftJoin(users, eq(users.id, messages.from_user));

  return (
    <BaseHTML>
      <aside>
        <hgroup>
          <h2>Chat room</h2>
          <h4>Please be polite!</h4>
        </hgroup>
        {session ? <LogoutButton /> : <SignInForm />}
      </aside>
      <div>
        {session ? (
          <div hx-ext="ws" ws-connect="/ws">
            <div id="chat_room">
              {messageList.map((message) => (
                <MessageBox message={message} currentUserId={Number(session.userId)}/>
              ))}
            </div>
            <Form />
          </div>
        ) : (
          <></>
        )}
      </div>
    </BaseHTML>
  );
}
