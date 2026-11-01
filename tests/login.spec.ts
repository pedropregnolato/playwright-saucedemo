import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('User Authentication on Swag Labs (POM learn)', () => {

  //Array storing all valid usernames that should Login successfully
  const validUsers = ['standard_user', 'problem_user', 'performance_glitch_user', 'visual_user'];
  const password = process.env.SAUCE_PASSWORD || 'secret_sauce'

  //Loop through the array of valid users and create a test for each one
  validUsers.forEach((username) => {
    test(`Successful login with valid credentials - ${username}`, async ({ page }) => {
      // Instantiate the page object
      const loginPage = new LoginPage(page);
      // Navigate to the login page
      await loginPage.navigateTo();
      // Fill out and submit credentials
      await loginPage.login(username, password);
      // Verify redirection to the inventory page
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
  });

  test('Unsuccessful login with a locked out user', async ({ page }) => {
    // Instantiate the page object
    const loginPage = new LoginPage(page);
    // Navigate to the login page
    await loginPage.navigateTo();
    // Fill out and submit credentials
    await loginPage.login(`locked_out_user`, password);
    // Verify the error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Epic sadface: Username is required - Blank data', async ({ page }) => {
    // Instantiate the page object
    const loginPage = new LoginPage(page);
    // Navigate to the login page
    await loginPage.navigateTo();
    // Attempt to login without entering any credentials
    await loginPage.loginButton.click();
    // Verify the error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
  });

  test('Epic sadface: Username is required', async ({ page }) => {
    // Instantiate the page object
    const loginPage = new LoginPage(page);
    // Navigate to the login page
    await loginPage.navigateTo();
    // Attempt to login without entering a username
    await loginPage.login(``, password);
    // Verify the error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
  });

  test('Epic sadface: Password is required', async ({ page }) => {
    // Instantiate the page object
    const loginPage = new LoginPage(page);
    // Navigate to the login page
    await loginPage.navigateTo();
    // Attempt to login without entering a password
    await loginPage.login('standard_user', '');
    // Verify the error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Password is required');
  });

  test('Epic sadface: Username do not match any user in this service', async ({ page }) => {
    // Instantiate the page object
    const loginPage = new LoginPage(page);
    // Navigate to the login page
    await loginPage.navigateTo();
    // Attempt to login with an invalid username
    await loginPage.login('wrong user', password);
    // Verify the error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  //Loop through the array of valid users and create a test for each one
  validUsers.forEach((username) => {
    test(`Epic sadface: Password do not match any user in this service - ${username}`, async ({ page }) => {
      // Instantiate the page object
      const loginPage = new LoginPage(page);
      // Navigate to the login page
      await loginPage.navigateTo();
      // Attempt to login with an invalid password
      await loginPage.login(username, 'wrongpassword');
      // Verify the error message
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    });
  });

  test('Should dismiss the error message when clicking the close button', async ({ page }) => {
    // Instantiate the page object
    const loginPage = new LoginPage(page);
    // Navegate to the login page
    await loginPage.navigateTo();
    // Trigger an error message by clicking Login with empety fields
    await loginPage.loginButton.click();
    // Verify the error message
    await expect(loginPage.errorMessage).toBeVisible();
    // Click the "X" close button to dismiss the error
    await loginPage.clickCloseError();
    // Verify that the error message is no longer visible
    await expect(loginPage.errorMessage).not.toBeVisible();
  });

});