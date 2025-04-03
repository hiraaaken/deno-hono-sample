import { createRoute } from "@hono/zod-openapi";
import { TaskSchema } from "../../../application/task/queries/task-schema.ts";
import { CreateTaskSchema } from "../../../application/task/commands/create-task-schema..ts";
import { z } from "zod";

// 全てのタスクのリストを取得する
export const getTasksRoute = createRoute({
  path: "/",
  method: "get",
  description: "全てのタスクのリストを取得する",
  responses: {
    200: {
      description: "タスクのリスト",
      content: {
        "application/json": {
          schema: z.array(TaskSchema),
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

// タスクを作成する
export const createTaskRoute = createRoute({
  path: "/",
  method: "post",
  description: "タスクを作成する",
  request: {
    params: CreateTaskSchema,
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
  },
});
