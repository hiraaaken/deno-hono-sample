import type { TaskRepositoryInterface } from "../../domain/task/repository/task-repository.ts";

export type GetAllTasksUseCasePayload = {
	id: string;
	title: string;
	description: string;
	dueDate?: Date;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export class GetAllTasksUseCase {
	constructor(private readonly taskRepository: TaskRepositoryInterface) {}

	async execute(): Promise<GetAllTasksUseCasePayload[]> {
		const tasks = await this.taskRepository.findAll();

		return tasks.map((task) => ({
			id: task.id,
			title: task.title,
			description: task.description,
			dueDate: task.dueDate,
			completed: task.completed,
			createdAt: task.createdAt,
			updatedAt: task.updatedAt,
		}));
	}
}
