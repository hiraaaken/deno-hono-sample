import { createRoute } from "@hono/zod-openapi";
import { TaskSchema } from "../../../application/task/queries/task-schema.ts";
import { z } from "zod";

export const getTaskByIdRoute = createRoute({
  path: "/{id}",
  method: "get",
  description: "タスクをIDで取得する",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: "タスクが取得された",
      content: {
        "application/json": {
          schema: TaskSchema,
        },
      },
    },
    404: {
      description: "タスクが見つからない",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
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
