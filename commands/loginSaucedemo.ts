import { Page } from "@playwright/test";

type Params = {
  username: string;
  password: string;
};

export const loginSaucedemo = async (page: Page, params: Params) => {
  const username = params.username;
  const password = params.password;

  const usernameInput = page.getByTestId("username");
  const passwordInput = page.getByTestId("password");

  await usernameInput.fill(username);
  await passwordInput.fill(password);

  const signInButton = page.getByTestId("login-button");
  await signInButton.click();
};
