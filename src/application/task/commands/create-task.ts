import { Task } from "../../../domain/task/entity/task.ts";
import type { TaskRepositoryInterface } from "../../../domain/task/repository/task-repository.ts";
import type { TaskDto } from "../queries/task-schema.ts";
import type { CreateTaskDto } from "./create-task-schema..ts";

export class CreateTask {
  constructor(private readonly taskRepository: TaskRepositoryInterface) {}

  public async execute(input: CreateTaskDto): Promise<TaskDto> {
    const task = Task.create(
      input.title,
      input.description,
      input.dueDate ? new Date(input.dueDate) : undefined,
      input.priority,
    );

    const savedTask = await this.taskRepository.save(task);
    return {
      id: savedTask.id.value,
      title: savedTask.title,
      description: savedTask.description,
      dueDate: savedTask.dueDate?.toISOString(),
      priority: savedTask.priority,
      completed: savedTask.completed,
      createdAt: savedTask.createdAt.toISOString(),
      updatedAt: savedTask.updatedAt.toISOString(),
    };
  }
}
