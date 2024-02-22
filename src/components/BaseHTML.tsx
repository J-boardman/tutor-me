export default function BaseHTML({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0"
        />

        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />
        <script src="/public/script.js" defer></script>
        <link rel="stylesheet" href="/public/index.css" />
        <title>Document</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
