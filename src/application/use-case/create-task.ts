import { Task } from "../../domain/task/entity/task.ts";
import type { TaskRepositoryInterface } from "../../domain/task/repository/task-repository.ts";

export type CreateTaskUseCaseInput = {
	title: string;
	description: string;
	dueDate?: Date;
};

export type CreateTaskUseCasePayload = {
	id: string;
	title: string;
	description: string;
	dueDate?: Date;
};

export class CreateTaskUseCase {
	constructor(private readonly taskRepository: TaskRepositoryInterface) {}

	public async execute(
		input: CreateTaskUseCaseInput,
	): Promise<CreateTaskUseCasePayload> {
		const task = new Task(input);
		const savedTask = await this.taskRepository.save(task);

		return {
			id: savedTask.id,
			title: savedTask.title,
			description: savedTask.description,
			dueDate: savedTask.dueDate,
		};
	}
}
