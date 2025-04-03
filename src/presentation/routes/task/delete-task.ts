import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const deleteTaskRoute = createRoute({
  path: "/{id}",
  method: "delete",
  description: "タスクを削除する",
  responses: {
    200: {
      description: "タスクが削除された",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
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
  },
});
