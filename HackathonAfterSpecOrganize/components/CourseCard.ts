import { Page } from '@playwright/test';

export class CourseCard {
  constructor(private page: Page) {}

  async getCourseDetails(index: number) {
    const name = await this.page.locator('//*[@class="cds-ProductCard-header"]//div[2]').nth(index).textContent();
    const rating = (await this.page.locator('[aria-label="Rating"]').nth(index).textContent())?.split(',')[1].trim();
    const hours = (await this.page.locator(".cds-CommonCard-metadata").nth(index).textContent())?.split('·')[2].trim();
    return { name, rating, hours };
  }
}
