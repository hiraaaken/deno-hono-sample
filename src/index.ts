import { Hono } from "@hono/hono";
import taskRouter from "./presentation/tasks.ts";

const app = new Hono();

app.route("/tasks", taskRouter);

Deno.serve({ port: 8787 }, app.fetch);
