import { expect, test } from "vitest";
import { greeting } from "@sharadox/privacy-web-library/greeting";

test("greets in English and Portuguese", () => {
  expect(greeting({ name: "Ana" })).toBe("Hello, Ana!");
  expect(greeting({ name: "Ana", language: "pt" })).toBe("Olá, Ana!");
});
