import type { TaskRepositoryInterface } from "../../../domain/task/repository/task-repository.ts";

export class DeleteTask {
  constructor(private readonly taskRepository: TaskRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }

    await this.taskRepository.delete(id);
  }
}
