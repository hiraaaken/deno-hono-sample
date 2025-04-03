import { z } from "zod";
import { extendZodWithOpenApi } from "@hono/zod-openapi";

extendZodWithOpenApi(z);

export const CreateTaskSchema = z
  .object({
    title: z.string().min(1).max(255).openapi({
      description: "タスクのタイトル",
      example: "卵を買う",
    }),
    description: z.string().min(1).max(1000).openapi({
      description: "タスクの説明",
      example: "スーパーで卵を買う",
    }),
    dueDate: z.string().datetime().optional().openapi({
      description: "タスクの期限",
      example: "2024-03-23T15:30:00Z"
    }),
    priority: z.number().min(1).max(5).default(3).openapi({
      description: "タスクの優先度",
      example: 3,
    }),
  })
  .openapi("CreateTaskSchema");

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
