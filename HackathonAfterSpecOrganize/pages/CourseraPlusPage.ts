import { Page } from '@playwright/test';

export class CourseraPlusPage {
  constructor(private page: Page) {}

  async getPricing() {
    const elementHandle = await this.page.locator('[data-testid="price-comparison"]').elementHandle();
    await elementHandle?.scrollIntoViewIfNeeded();
    const locator = this.page.locator(".rc-ReactPriceDisplay");
    return [
      await locator.nth(2).textContent(),
      await locator.nth(3).textContent(),
      await locator.nth(4).textContent(),
    ];
  }
}
