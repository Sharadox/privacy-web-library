// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { PrivacyPolicyView } from "@sharadox/privacy-web-library/privacy-policy-view";

test("shows the date, then every part with its heading, paragraphs and list", () => {
  const { container } = render(
    <PrivacyPolicyView
      className="policy"
      policy={{
        title: "Privacy Policy",
        updated: "Last updated: today",
        sections: [
          { title: "Who we are", paragraphs: ["Example."] },
          { title: "Your rights", paragraphs: ["You may:"], items: ["see it", "delete it"] },
        ],
      }}
    />,
  );
  expect(container.firstElementChild!.className).toBe("policy");
  expect(screen.getByText("Last updated: today")).toBeDefined();
  expect(screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent)).toEqual([
    "Who we are",
    "Your rights",
  ]);
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});
