import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Counter } from "@sharadox/privacy-web-library/counter";

test("counts clicks and accepts a class name", () => {
  render(<Counter label="Clicks" className="custom" />);
  const button = screen.getByRole("button", { name: "Clicks 0" });
  fireEvent.click(button);
  expect(button.textContent).toBe("Clicks 1");
  expect(button.className).toContain("custom");
});
