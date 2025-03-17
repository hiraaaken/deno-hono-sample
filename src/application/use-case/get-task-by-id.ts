import type { TaskRepositoryInterface } from "../../domain/task/repository/task-repository.ts";

export type GetTaskByIdUseCasePayload = {
	id: string;
	title: string;
	description: string;
	dueDate?: Date;
};

export class GetTaskByIdUseCase {
	constructor(private readonly taskRepository: TaskRepositoryInterface) {}

	async execute(id: string): Promise<GetTaskByIdUseCasePayload> {
		const task = await this.taskRepository.findById(id);

		if (!task) {
			throw new Error("Task not found");
		}

		return {
			id: task.id,
			title: task.title,
			description: task.description,
			dueDate: task.dueDate,
		};
	}
}
