import { createRoute } from "@hono/zod-openapi";
import { CreateTaskSchema } from "../../../application/task/commands/create-task-schema..ts";
import { TaskSchema } from "../../../application/task/queries/task-schema.ts";
import { z } from "zod";

export const createTaskRoute = createRoute({
  path: "/",
  method: "post",
  description: "タスクを作成する",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateTaskSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "タスクが作成された",
      content: {
        "application/json": {
          schema: TaskSchema,
        },
      },
    },
    500: {
      description: "サーバーエラー",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});
