import { OpenAPIHono } from "@hono/zod-openapi";
import { PGliteTaskRepository } from "../../../infrastructure/repository/pglite-task-repository.ts";
import { db } from "../../../lib/drizzle/client.ts";
import type { TaskRepositoryInterface } from "../../../domain/task/repository/task-repository.ts";
import { CreateTask } from "../../../application/task/commands/create-task.ts";
import { GetAllTasks } from "../../../application/task/queries/get-all-tasks.ts";
import { GetTaskById } from "../../../application/task/queries/get-task-by-id.ts";
import { DeleteTask } from "../../../application/task/commands/delete-task.ts";
import { getTasksRoute } from "./get-all-tasks.ts";
import { createTaskRoute } from "./create-task.ts";
import { getTaskByIdRoute } from "./get-task-by-id.ts";
import { deleteTaskRoute } from "./delete-task.ts";

type ENV = {
  Variables: {
    taskRepository: TaskRepositoryInterface;
    createTask: CreateTask;
    getAllTasks: GetAllTasks;
    getTaskById: GetTaskById;
    deleteTask: DeleteTask;
  };
};

const task = new OpenAPIHono<ENV>();

task.use("*", async (c, next) => {
  const taskRepository = new PGliteTaskRepository(db);
  c.set("taskRepository", taskRepository);
  await next();
});

task
  .openapi(getTasksRoute, async (c) => {
    const getAllTasks = new GetAllTasks(c.var.taskRepository);
    const tasks = await getAllTasks.execute();
    return c.json(tasks, 200);
  })
  .openapi(createTaskRoute, async (c) => {
    const createTask = new CreateTask(c.var.taskRepository);
    const task = await createTask.execute(await c.req.json());
    return c.json(task, 201);
  }).openapi(getTaskByIdRoute, async (c) => {
    const getTaskById = new GetTaskById(c.var.taskRepository);
    const task = await getTaskById.execute(c.req.param("id"));
    return c.json(task, 200);
  }).openapi(deleteTaskRoute, async (c) => {
    const deleteTask = new DeleteTask(c.var.taskRepository);
    await deleteTask.execute(c.req.param("id"));
    return c.json({ message: "Task deleted successfully" }, 200);
  });

export default task;
