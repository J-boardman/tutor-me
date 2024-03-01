export default function SignInForm() {
  return (
    <form id="sign-in-form" hx-post="/sign-in" hx-swap="outerHTML">
      <hgroup>
        <h2>Sign in</h2>
        <a
          hx-get="/sign-up"
          href="/sign-up"
          hx-target="closest form"
          class="contrast"
          hx-swap="outerHTML"
          hx-boost="true"
        >
          Need an account?
        </a>
      </hgroup>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        minlength={5}
        required
      />
      <button type="submit">Log in</button>
    </form>
  );
}
