import { test as base, chromium } from '@playwright/test';

export const test = base.extend<{
  context: any;
  page: any;
}>({
  context: async ({}, use) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    await use(context);
    await browser.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  },
});
