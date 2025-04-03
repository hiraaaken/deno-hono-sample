import { InvalidValueObjectError } from "./invalid-value-error.ts";

const opaqueSymbol: unique symbol = Symbol("opaqueSymbol");

export abstract class ValueObject<T extends string, K> {
  private readonly [opaqueSymbol]: T = undefined!;
  readonly value: K;

  constructor(value: K) {
    if (!this.isValid(value)) {
      throw new InvalidValueObjectError("Invalid value");
    }
    this.value = value;
  }

  equals(other: ValueObject<T, K>): boolean {
    return this === other || this.value === other.value;
  }

  toString(): string {
    return String(this.value);
  }

  protected abstract isValid(value: K): boolean;
}
