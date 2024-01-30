import { test, expect } from "@playwright/test";

const cards = [
  {
    id: "Members",
    name: "Members Learn more about Smart Pension. Sign in to get real-time valuations and manage your savings.",
  },
  {
    id: "Employers",
    name: "Employers Set up a workplace pension or switch your current pension provider. Smart Pension helps you with auto enrolment.",
  },
  {
    id: "Advisers",
    name: "Advisers Smart Pension is the ideal platform for EBCs, IFAs, accountants, and payroll providers.",
  },
];

cards.forEach((element) => {
  test(`smart pension card ${element.id}`, async ({ page }) => {
    await page.goto("https://www.smartpension.co.uk/");
    const card = page.getByRole("link", { name: element.name });
    expect(card).toBeDefined();
  });
});
