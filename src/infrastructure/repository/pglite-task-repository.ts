import type { TaskRepositoryInterface } from "../../domain/task/repository/task-repository.ts";
import { Task } from "../../domain/task/entity/task.ts";
import { tasks } from "../../lib/drizzle/schema.ts";
import type { db } from "../../lib/drizzle/client.ts";
import { eq } from "drizzle-orm";

export class PGliteTaskRepository implements TaskRepositoryInterface {
	public constructor(private readonly database: typeof db) {}

	async save(task: Task): Promise<Task> {
		const [row] = await this.database
			.insert(tasks)
			.values({
				title: task.title,
				description: task.description,
				dueDate: task.dueDate,
				completed: task.completed,
				updatedAt: task.updatedAt,
			})
			.onConflictDoUpdate({
				target: [tasks.id],
				set: {
					title: task.title,
					description: task.description,
					dueDate: task.dueDate,
					completed: task.completed,
					updatedAt: task.updatedAt,
				},
			})
			.returning({
				id: tasks.id,
				title: tasks.title,
				description: tasks.description,
				dueDate: tasks.dueDate,
				completed: tasks.completed,
				createdAt: tasks.createdAt,
				updatedAt: tasks.updatedAt,
			});

		if (!row) {
			throw new Error("Failed to save task");
		}

		return new Task({
			id: row.id,
			title: row.title,
			description: row.description,
			dueDate: row.dueDate ?? undefined,
			completed: row.completed,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt,
		});
	}

	async findAll(): Promise<Task[]> {
		const rows = await this.database.select().from(tasks);

		return rows.map((row) => {
			return new Task({
				id: row.id,
				title: row.title,
				description: row.description,
				dueDate: row.dueDate ?? undefined,
				completed: row.completed,
				createdAt: row.createdAt,
				updatedAt: row.updatedAt,
			});
		});
	}

	async findById(id: string): Promise<Task | null> {
		const row = await this.database.query.tasks.findFirst({
			where: eq(tasks.id, id),
		});

		if (!row) {
			return null;
		}

		return new Task({
			id: row.id,
			title: row.title,
			description: row.description,
			dueDate: row.dueDate ?? undefined,
			completed: row.completed,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt,
		});
	}
}
