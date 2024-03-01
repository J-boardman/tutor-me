export default function LogoutButton() {
  return (
    <form hx-post="/sign-out" hx-swap="outerHTML">
      <button type="submit">Log out</button>
    </form>
  );
}
