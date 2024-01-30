import { test, expect } from "@playwright/test";

test("Get todo item", async ({ request }) => {
  const todoOne = await request.get(
    `https://jsonplaceholder.typicode.com/todos/1`
  );

  expect(todoOne.ok()).toBeTruthy();
  expect(await todoOne.json()).toEqual(
    expect.objectContaining({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    })
  );
});

test("Get not existing todo item", async ({ request }) => {
  const todoOne = await request.get(
    `https://jsonplaceholder.typicode.com/todos/abc`
  );

  expect(todoOne.ok()).toBeFalsy();
  expect(await todoOne.json()).toEqual({});
});
