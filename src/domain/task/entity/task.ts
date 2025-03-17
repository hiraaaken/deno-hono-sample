export class Task {
	readonly #id: string;
	#title: string;
	#description: string;
	#completed: boolean;
	#dueDate?: Date;
	#createdAt: Date;
	#updatedAt: Date;

	constructor(
		props:
			| {
					title: string;
					description: string;
					dueDate?: Date;
			  }
			| {
					id: string;
					title: string;
					description: string;
					dueDate?: Date;
					completed: boolean;
					createdAt: Date;
					updatedAt: Date;
			  },
	) {
		if ("id" in props) {
			this.#id = props.id;
			this.#title = props.title;
			this.#description = props.description;
			this.#dueDate = props.dueDate;
			this.#completed = props.completed;
			this.#createdAt = props.createdAt;
			this.#updatedAt = props.updatedAt;
		} else {
			this.#id = crypto.randomUUID();
			this.#title = props.title;
			this.#description = props.description;
			this.#completed = false;
			this.#createdAt = new Date();
			this.#updatedAt = new Date();
		}
	}

	// Getters
	public get id(): string {
		return this.#id;
	}

	public get title(): string {
		return this.#title;
	}

	public get description(): string {
		return this.#description;
	}

	public get completed(): boolean {
		return this.#completed;
	}

	public get dueDate(): Date | undefined {
		return this.#dueDate;
	}

	public get createdAt(): Date {
		return this.#createdAt;
	}

	public get updatedAt(): Date {
		return this.#updatedAt;
	}

	public equals(task: Task): boolean {
		return this.id === task.id;
	}

	complete(): void {
		this.#completed = true;
		this.#updatedAt = new Date();
	}
}
