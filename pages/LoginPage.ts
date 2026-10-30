import { Page, Locator } from '@playwright/test';

export class LoginPage {
  // 1. Define the types for your variables
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly closeErrorButton: Locator;

  // 2. Initialize your elements (Selectors) inside the constructor
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.closeErrorButton = page.locator('[data-test="error-button"]');
  }

  // 3. Create reusable methods (Actions)
  async navigateTo() {
    await this.page.goto('https://saucedemo.com');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickCloseError() {
    await this.closeErrorButton.click();
  }
}