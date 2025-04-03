import { TaskId } from "../valueObject/taskId.ts";

export class Task {
  constructor(
    private readonly _id: TaskId,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _completed: boolean,
    private readonly _dueDate?: Date,
    private readonly _priority: number = 3,
    private readonly _createdAt: Date = new Date(),
    private readonly _updatedAt: Date = new Date(),
  ) {}

  static create(
    title: string,
    description: string,
    dueDate?: Date,
    priority: number = 3,
  ): Task {
    return new Task(
      TaskId.generate(),
      title,
      description,
      false,
      dueDate,
      priority,
      new Date(),
      new Date(),
    );
  }

  complete(): Task {
    return new Task(
      this._id,
      this._title,
      this._description,
      true,
      this._dueDate,
      this._priority,
      this._createdAt,
      new Date(),
    );
  }

  update(
    title?: string,
    description?: string,
    dueDate?: Date,
    priority?: number,
  ): Task {
    return new Task(
      this._id,
      title ?? this._title,
      description ?? this._description,
      this._completed,
      dueDate ?? this._dueDate,
      priority ?? this._priority,
      this._createdAt,
      new Date(),
    );
  }

  get id(): TaskId {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get completed(): boolean {
    return this._completed;
  }

  get dueDate(): Date | undefined {
    return this._dueDate;
  }

  get priority(): number {
    return this._priority;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
