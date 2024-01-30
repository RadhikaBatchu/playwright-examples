import { test, expect } from "@playwright/test";
import { loginSaucedemo } from "../commands/loginSaucedemo";

test("Login", async ({ page }) => {
  // best to keep sensitive stuff in .env files, but for simplicity sake hardcoding it here
  const username = "standard_user";
  const password = "secret_sauce";

  await loginSaucedemo(page, {
    password,
    username,
  });

  await expect(page).toHaveURL(/inventory/);
});

test("Add to cart", async ({ page }) => {
  // best to keep sensitive stuff in .env files, but for simplicity sake hardcoding it here
  const username = "standard_user";
  const password = "secret_sauce";

  await loginSaucedemo(page, {
    password,
    username,
  });

  const itemSelector = "sauce-labs-backpack";

  // This won't always work in real life since we won't know what the api returns
  // Options:
  // 1. Using a mocked API with pre defined data (review app API)
  // 2. Intercepting API calls to read the items and from those items to form the selector
  const addToCartButton = page.locator(
    `[data-test="add-to-cart-${itemSelector}"]`
  );

  await addToCartButton.click();
  const goToCartButton = page.locator("#shopping_cart_container a");

  await goToCartButton.click();

  await expect(page).toHaveURL(/cart/);
  await expect(
    page.locator(`[data-test="remove-${itemSelector}"]`)
  ).toBeVisible();

  const checkoutButton = page.locator('[data-test="checkout"]');
  await checkoutButton.click();
  await expect(page).toHaveURL(/checkout/);

  const firstNameInput = page.locator('[data-test="firstName"]');
  const lastNameInput = page.locator('[data-test="lastName"]');
  const postalCodeInput = page.locator('[data-test="postalCode"]');
  const continueButton = page.locator('[data-test="continue"]');

  await firstNameInput.fill("first name");
  await lastNameInput.fill("last name");
  await postalCodeInput.fill("postalCode name");

  await continueButton.click();

  await expect(page).toHaveURL(/checkout-step-two/);
  const checkoutOverviewPageTitle = page
    .locator("div")
    .filter({ hasText: /^Checkout: Overview$/ });

  await expect(checkoutOverviewPageTitle).toBeVisible();
  const finishCheckoutButton = page.locator('[data-test="finish"]');
  await finishCheckoutButton.click();

  await expect(page).toHaveURL(/checkout-complete/);

  const successPageTitle = page.getByRole("heading", {
    name: "Thank you for your order!",
  });
  await expect(successPageTitle).toBeVisible();
});
