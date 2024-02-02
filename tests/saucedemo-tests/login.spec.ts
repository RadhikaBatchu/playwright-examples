import { test, expect } from "@playwright/test";
import { loginSaucedemo } from "../../commands/loginSaucedemo";

test.beforeEach(async ({ page }) => {
  // Also would be nice to put it in an .env variable for easier configuration
  // when running on ci or targeting specific environments
  await page.goto("https://saucedemo.com");
});

test.describe("Login tests", () => {
  test("Valid credentials", async ({ page }) => {
    // best to keep sensitive stuff in .env files, but for simplicity sake hardcoding it here
    const username = "standard_user";
    const password = "secret_sauce";

    await loginSaucedemo(page, {
      password,
      username,
    });

    await expect(page).toHaveURL(/inventory/);
  });

  test("Invalid credentials", async ({ page }) => {
    // best to keep sensitive stuff in .env files, but for simplicity sake hardcoding it here
    const username = "wrong_user";
    const password = "wrong_password";

    await loginSaucedemo(page, {
      password,
      username,
    });

    const errorContainer = page.getByTestId("error");
    const errorMessage = page.getByText(
      "Epic sadface: Username and password do not match any user in this service"
    );

    await expect(errorContainer).toBeVisible();
    await expect(errorMessage).toBeVisible();
  });

  test("Locked user", async ({ page }) => {
    const username = "locked_out_user";
    const password = "secret_sauce";

    await loginSaucedemo(page, {
      password,
      username,
    });

    const errorContainer = page.getByTestId("error");
    const errorMessage = page.getByText(
      "Epic sadface: Sorry, this user has been locked out."
    );

    await expect(errorContainer).toBeVisible();
    await expect(errorMessage).toBeVisible();
  });

  test("Without username", async ({ page }) => {
    const signInButton = page.getByTestId("login-button");
    await signInButton.click();

    const errorContainer = page.getByTestId("error");
    const errorMessage = page.getByText("Epic sadface: Username is required");

    await expect(errorContainer).toBeVisible();
    await expect(errorMessage).toBeVisible();
  });

  test("Without password", async ({ page }) => {
    await loginSaucedemo(page, {
      password: "",
      username: "username",
    });

    const signInButton = page.getByTestId("login-button");
    await signInButton.click();

    const errorContainer = page.getByTestId("error");
    const errorMessage = page.getByText("Epic sadface: Password is required");

    await expect(errorContainer).toBeVisible();
    await expect(errorMessage).toBeVisible();
  });
});
