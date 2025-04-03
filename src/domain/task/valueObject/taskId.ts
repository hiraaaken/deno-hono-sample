import { z } from "zod";
import { ValueObject } from "../../value-object.ts";

const uuidSchema = z.string().uuid();

export class TaskId extends ValueObject<"TaskId", string> {
  protected override isValid(value: string): boolean {
    return uuidSchema.safeParse(value).success;
  }

  static generate(): TaskId {
    return new TaskId(crypto.randomUUID());
  }
}
