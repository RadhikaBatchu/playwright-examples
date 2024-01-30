import { Page } from "@playwright/test";

type Params = {
  username: string;
  password: string;
};

export const loginSaucedemo = async (page: Page, params: Params) => {
  const username = params.username;
  const password = params.password;

  // Also would be nice to put it in an .env variable for easier configuration
  // when running on ci or targeting specific environments
  await page.goto("https://saucedemo.com");

  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');

  await usernameInput.fill(username);
  await passwordInput.fill(password);

  const signInButton = page.locator('[data-test="login-button"]');
  await signInButton.click();
};
