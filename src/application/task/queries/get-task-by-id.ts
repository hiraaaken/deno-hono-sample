import type { TaskRepositoryInterface } from "../../../domain/task/repository/task-repository.ts";
import type { TaskDto } from "./task-schema.ts";
export class GetTaskById {
  constructor(private readonly taskRepository: TaskRepositoryInterface) {}

  async execute(id: string): Promise<TaskDto> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return {
      id: task.id.value,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.toISOString(),
      priority: task.priority,
      completed: task.completed,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };
  }
}
