import { Hono } from "@hono/hono";
import { CreateTaskUseCase } from "../application/use-case/create-task.ts";
import { GetAllTasksUseCase } from "../application/use-case/get-all-tasks.ts";
import { GetTaskByIdUseCase } from "../application/use-case/get-task-by-id.ts";
import { PGliteTaskRepository } from "../infrastructure/repository/pglite-task-repository.ts";
import { db } from "../lib/drizzle/client.ts";
import { z } from "zod";
import { createMiddleware } from "@hono/hono/factory";
import type { TaskRepositoryInterface } from "../domain/task/repository/task-repository.ts";

type ENV = {
	Variables: {
		taskRepository: TaskRepositoryInterface;
		createTaskUseCase: CreateTaskUseCase;
		getTaskByIdUseCase: GetTaskByIdUseCase;
	};
};

const createTaskSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	dueDate: z.string().datetime().optional(),
});

const taskRouter = new Hono<ENV>();

taskRouter
	.use("*", async (c, next) => {
		const taskRepository = new PGliteTaskRepository(db);
		c.set("taskRepository", taskRepository);
		await next();
	})
	.get("/", async (c) => {
		const getAllTasksUseCase = new GetAllTasksUseCase(c.var.taskRepository);
		const tasks = await getAllTasksUseCase.execute();

		return c.json(tasks, 200);
	})
	.get("/:id", async (c) => {
		const taskRepository = new PGliteTaskRepository(db);
		const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
		const task = await getTaskByIdUseCase.execute(c.req.param("id"));

		return c.json(task, 200);
	})
	.post(
		"/",
		createMiddleware<ENV>(async (c, next) => {
			const createTaskUseCase = new CreateTaskUseCase(c.var.taskRepository);
			c.set("createTaskUseCase", createTaskUseCase);

			await next();
		}),
		async (c) => {
			const body = await c.req.json();
			const validatedData = createTaskSchema.parse(body);

			const task = await c.var.createTaskUseCase.execute({
				...validatedData,
				dueDate: validatedData.dueDate
					? new Date(validatedData.dueDate)
					: undefined,
			});

			return c.json(task, 201);
		},
	);

taskRouter.put("/:id", (c) => c.text("Hello Deno!"));
taskRouter.delete("/:id", (c) => c.text("Hello Deno!"));

export default taskRouter;
