export default function SignUpForm() {
  return (
    <form hx-post="/sign-up" hx-swap="outerHTML">
      <hgroup>
        <h2>Sign up</h2>
        <a
          class="contrast"
          href="/sign-in"
          hx-get="/sign-in"
          hx-boost="true"
          hx-target="closest form"
          hx-swap="outerHTML"
        >
          Already have an account?
        </a>
      </hgroup>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        required
        minlength={3}
      />
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
      <button type="submit">Sign up</button>
    </form>
  );
}
