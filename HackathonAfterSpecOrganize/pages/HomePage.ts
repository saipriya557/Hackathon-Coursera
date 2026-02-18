import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://www.coursera.org/");
  }

  async searchCourse(courseName: string) {
    const search = this.page.getByPlaceholder('What do you want to learn?');
    await search.fill(courseName);
    await search.press('Enter');
  }

  async openCourseraPlus() {
    await this.page.locator(".cds-button-label").first().click();
    await this.page.locator('[data-testid="megamenu-coursera-plus-link"]').click();
  }

  async openForUniversities() {
    await this.page.locator('a', { hasText: "For Universities" }).click();
  }
}
