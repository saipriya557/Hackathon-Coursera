// import { BrowserContext, Page } from '@playwright/test';
// import { test } from '../fixtures/test-fixture';
// import { HomePage } from '../pages/HomePage';
// import { CourseraPlusPage } from '../pages/CourseraPlusPage';
// import { Logger } from '../utils/logger';

// test.describe.configure({ mode: 'serial' });

// let context: BrowserContext;
// let page: Page;
// let home: HomePage;
// let plusPage: CourseraPlusPage;

// test.beforeAll(async ({ browser }) => {
//   Logger.log('Scenario started4');
//   context = await browser.newContext();
//   page = await context.newPage();
//   home = new HomePage(page);
//   plusPage = new CourseraPlusPage(page);
// });

// test.afterAll(async () => {
//   await context.close();
//   Logger.log('Scenario finished4');
// });

// test('Plus: open and log pricing', async () => {
//   await home.goto();
//   await home.openCourseraPlus();
//   const prices = await plusPage.getPricing();
//   prices.forEach(p => Logger.log(p ?? ''));
// });

// test('Plus: validate pricing again', async () => {
//   const prices = await plusPage.getPricing();
//   prices.forEach(p => Logger.log(p ?? ''));
// });


import { BrowserContext, Page } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { HomePage } from '../pages/HomePage';
import { CourseraPlusPage } from '../pages/CourseraPlusPage';
import { Logger } from '../utils/logger';

test.describe.configure({ mode: 'serial' });

let context: BrowserContext;
let page: Page;
let home: HomePage;
let plusPage: CourseraPlusPage;

test.beforeAll(async ({ browser }) => {
  try {
    Logger.log('Scenario started4');
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    plusPage = new CourseraPlusPage(page);
  } catch (error) {
    Logger.error(`Error in beforeAll: ${(error as Error).message}`);
    throw error;
  }
});

test.afterAll(async () => {
  try {
    await context.close();
    Logger.log('Scenario finished4');
  } catch (error) {
    Logger.error(`Error in afterAll: ${(error as Error).message}`);
    throw error;
  }
});

test('@smoke @sanity Plus: open and log pricing', async () => {
  try {
    await home.goto();
    await home.openCourseraPlus();
    const prices = await plusPage.getPricing();
    prices.forEach(p => Logger.log(p ?? ''));
  } catch (error) {
    Logger.error(`Error in Plus: open and log pricing: ${(error as Error).message}`);
    throw error;
  }
});

test('@sanity Plus: validate pricing again', async () => {
  try {
    const prices = await plusPage.getPricing();
    prices.forEach(p => Logger.log(p ?? ''));
  } catch (error) {
    Logger.error(`Error in Plus: validate pricing again: ${(error as Error).message}`);
    throw error;
  }
});
