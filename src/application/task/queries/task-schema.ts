import { z } from "zod";
import { extendZodWithOpenApi } from "@hono/zod-openapi";

extendZodWithOpenApi(z);

export const TaskSchema = z
  .object({
    id: z.string().openapi({
      description: "タスクのID",
      example: "123",
    }),
    title: z.string().min(1).max(255).openapi({
      description: "タスクのタイトル",
      example: "Buy groceries",
    }),
    description: z.string().min(1).max(1000).openapi({
      description: "タスクの説明",
      example: "Buy groceries",
    }),
    completed: z.boolean().default(false).openapi({
      description: "タスクが完了しているかどうか",
      example: false,
    }),
    dueDate: z.string().datetime().optional().openapi({
      description: "タスクの期限",
      example: "2025-01-01",
    }),
    priority: z.number().min(1).max(5).default(3).openapi({
      description: "タスクの優先度",
      example: 3,
    }),
    createdAt: z.string().datetime().openapi({
      description: "タスクの作成日",
      example: "2025-03-23",
    }),
    updatedAt: z.string().datetime().openapi({
      description: "タスクの更新日",
      example: "2025-03-23",
    }),
  })
  .openapi("TaskSchema");

export type TaskDto = z.infer<typeof TaskSchema>;
