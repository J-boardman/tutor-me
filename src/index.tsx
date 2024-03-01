import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import HomePage from "./pages/HomePage";
import chatService from "./controllers/chat";
import auth from "./controllers/auth";
import { sessionMiddleware } from "./middleware/sessions";
import messageRoutes from "./controllers/messages";
import BaseHTML from "./components/BaseHTML";
import { $ } from "bun";

const app = new Elysia()
  .use(sessionMiddleware)
  .use(html())
  .use(staticPlugin())
  .use(auth)
  .guard(
    {
      beforeHandle({ set, session }) {
        if (!session) {
          set.status = "Unauthorized";
          return (set.redirect = "/sign-in");
        }
      },
    },
    (app) =>
      app
        .get("/", ({ session, set }) => {
          return <HomePage session={session ?? null} />;
        })
        .get("/test", () => {
          return (
            <BaseHTML>
              <h2>Hello</h2>
              <form
                id="form"
                hx-encoding="multipart/form-data"
                hx-post="/upload"
              >
                <input type="file" name="file" />
                <button>Upload</button>
              </form>
            </BaseHTML>
          );
        })
        .post(
          "/upload",
          async ({ body }) => {
            try {
              const testFilePath = "./src/tests/add.test.ts";
              const originalFile = await Bun.file(testFilePath).text();

              const file = await body.file.text();

              await $`echo "${file}" >> ${testFilePath}`;
              await $`bun x vitest run --reporter=json --outputFile=./src/tests/test-output.json`;

              const results = await Bun.file(
                "./src/tests/test-output.json"
              ).json();

              const { numPassedTests, numTotalTests } = results;
              await Bun.write(testFilePath, originalFile);
              return (
                <p>
                  You passed {numPassedTests} out of {numTotalTests} questions
                </p>
              );
            } catch (error) {
              console.log(error);
              return <p>Error</p>;
            }
          },
          {
            body: t.Object({ file: t.File() }),
          }
        )
  )
  .use(chatService)
  .use(messageRoutes)
  .listen(3000);
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
