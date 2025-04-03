import type { TaskRepositoryInterface } from "../../../domain/task/repository/task-repository.ts";
import { TaskDto } from "./task-schema.ts";

export class GetAllTasks {
  constructor(private readonly taskRepository: TaskRepositoryInterface) {}

  async execute(): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.findAll();

    return tasks.map((task) => ({
      id: task.id.toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.toISOString(),
      priority: task.priority,
      completed: task.completed,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    }));
  }
}
