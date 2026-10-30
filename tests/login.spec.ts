import { test, expect } from '@playwright/test';

test.describe('User Authentication on Swag Labs', () => {

  //Array storing all valid usernames that should Login successfully
  const validUsers = ['standard_user',
    'problem_user',
    'performance_glitch_user',
    'visual_user'];

  //Loop through the array of valid users and create a test for each one
  validUsers.forEach((username) => {
    test(`Successful login with valid credentials - ${username}`, async ({ page }) => {
      // Navigate to the login page
      await page.goto('https://www.saucedemo.com/');

      // Fill out and submit credentials
      await page.locator('[data-test="username"]').fill(username);
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();

      // Verify redirection to the inventory page
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
  });

  test('Unsuccessful login with a locked out user', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');

    // Fill out and submit credentials
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify the error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Epic sadface: Username is required - Blank data', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');

    // Attempt to login without entering any credentials
    await page.locator('[data-test="login-button"]').click();

    // Verify the error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username is required');
  });

  test('Epic sadface: Username is required', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');

    // Attempt to login without entering a username
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify the error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username is required');
  });

  test('Epic sadface: Password is required', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');

    // Attempt to login without entering a password
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();

    // Verify the error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Password is required');
  });

  test('Epic sadface: Username do not match any user in this service', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');

    // Attempt to login with an invalid username
    await page.locator('[data-test="username"]').fill('wrong user');
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Verify the error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  //Loop through the array of valid users and create a test for each one
  validUsers.forEach((username) => {
    test(`Epic sadface: Password do not match any user in this service - ${username}`, async ({ page }) => {
      // Navigate to the login page
      await page.goto('https://www.saucedemo.com/');

      // Attempt to login with an invalid password
      await page.locator('[data-test="username"]').fill(username);
      await page.locator('[data-test="password"]').fill("wrongpassword");
      await page.locator('[data-test="login-button"]').click();

      // Verify the error message
      const errorMessage = page.locator('[data-test="error"]');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    });
  });


  test('Close error button', async ({ page }) => {
    // Navegate to the login page
    await page.goto('https://www.saucedemo.com/');

    // Trigger an error message by clicking Login with empety fields
    await page.locator('[data-test="login-button"]').click();

    // Verify the error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();

    // Click the "X" close button to dismiss the error
    await page.locator('[data-test="error-button"]').click();

    // Verify that the error message is no longer visible
    await expect(errorMessage).not.toBeVisible();
  });

});

