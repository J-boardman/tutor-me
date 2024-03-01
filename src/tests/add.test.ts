import { describe, expect, test } from "vitest";

describe("Basic maths", () => {
  test("adds two numbers", () => {
    // @ts-expect-error
    expect(add(1, 3)).toBe(4);
  });
  test("subtracts two numbers", () => {
    // @ts-expect-error
    expect(subtract(3, 1)).toBe(2);
  });
  test("multiplies two numbers", () => {
    // @ts-expect-error
    expect(multiply(4, 2)).toBe(8);
  });
  test("divides two numbers", () => {
    // @ts-expect-error
    expect(divide(4, 2)).toBe(2);
  });
});
