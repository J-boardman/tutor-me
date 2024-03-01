import { MessageWithUser } from "../pages/HomePage";

type Props = {
  message: MessageWithUser;
  currentUserId: number;
};

export default function MessageBox({ message: data, currentUserId }: Props) {
  const { message, user } = data;
  return (
    <article x-data="{editing: false}">
      <header>
        <hgroup>
          <h5>{user?.name || "Unkown user"}</h5>
          <p>
            {new Intl.DateTimeFormat("en-au", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(message.sent_at as string))}
          </p>
        </hgroup>
        <div>
          {currentUserId == message.from_user ? (
            <>
              <div x-show="!editing" role="group">
                <button x-on:click="editing = true" class="secondary">
                  Edit
                </button>
                <button
                  hx-confirm="Are you sure?"
                  hx-delete={`/messages/${message.id}`}
                  hx-target="closest article"
                  hx-swap="outerHTML"
                  class="secondary"
                >
                  Delete
                </button>
              </div>
              <div x-show="editing" role="group">
                <button class="secondary" x-on:click="editing = false">
                  Cancel
                </button>
                <button
                  x-on:click="editing = !editing"
                  hx-include="next input[name='message']"
                  hx-patch={`/messages/${message.id}`}
                  hx-target="next p"
                  class="secondary"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </header>
      <div>
        <p x-show="!editing">{message.message}</p>
        <input
          name="message"
          x-show="editing"
          type="text"
          value={message.message}
        />
      </div>
    </article>
  );
}
