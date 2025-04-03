import task from "./presentation/routes/task/index.ts";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono();

app.route("/tasks", task);

// swagger ui
app.get(
  "/ui",
  swaggerUI({
    url: "/doc",
  }),
);

app.doc("/doc", {
  info: {
    title: "Deno Hono Sample API",
    version: "1.0.0",
    description: "Deno Hono Sample API",
  },
  openapi: "3.1.0",
});

Deno.serve({ port: 8787 }, app.fetch);
