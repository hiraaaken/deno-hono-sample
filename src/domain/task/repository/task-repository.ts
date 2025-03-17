import type { Task } from "../entity/task.ts";

export interface TaskRepositoryInterface {
	save: (task: Task) => Promise<Task>;
	findAll: () => Promise<Task[]>;
	findById: (id: string) => Promise<Task | null>;
}
