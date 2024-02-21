export default function Form() {
  return (
    <form id="form" ws-send>
      <fieldset role="group">
        <input
          type="text"
          name="message"
          autofocus="true"
          placeholder="Type your message here..."
          required
          min={1}
        />
        <button>Send</button>
      </fieldset>
    </form>
  );
}
