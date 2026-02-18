import { BrowserContext, Page } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { HomePage } from '../pages/HomePage';
import { UniversityFormPage } from '../pages/UniversityFormPage';
import { Logger } from '../utils/logger';

test.describe.configure({ mode: 'serial' });

let context: BrowserContext;
let page: Page;
let home: HomePage;
let formPage: UniversityFormPage;

test.beforeAll(async ({ browser }) => {
  Logger.log('Scenario started3');
  context = await browser.newContext();
  page = await context.newPage();
  home = new HomePage(page);
  formPage = new UniversityFormPage(page);
});

test.afterAll(async () => {
  await context.close();
  Logger.log('Scenario finished3');
});

test('University: open and submit form', async () => {
  await home.goto();
  await home.openForUniversities();
  await formPage.fillForm();
  const msg = (await formPage.getErrorMessage()) ?? '';
  Logger.log(msg);
});

test('University: re-submit and validate error', async () => {
  await formPage.fillForm();
  const msg = (await formPage.getErrorMessage()) ?? '';
  Logger.log(msg);
});



// import { BrowserContext, Page } from '@playwright/test';
// import { test } from '../fixtures/test-fixture';
// import { HomePage } from '../pages/HomePage';
// import { UniversityFormPage } from '../pages/UniversityFormPage';
// import { Logger } from '../utils/logger';

// test.describe.configure({ mode: 'serial' });

// let context: BrowserContext;
// let page: Page;
// let home: HomePage;
// let formPage: UniversityFormPage;

// test.beforeAll(async ({ browser }) => {
//   try {
//     Logger.log('Scenario started3');
//     context = await browser.newContext();
//     page = await context.newPage();
//     home = new HomePage(page);
//     formPage = new UniversityFormPage(page);
//   } catch (error) {
//     Logger.error(`Error in beforeAll: ${(error as Error).message}`);
//     throw error;
//   }
// });

// test.afterAll(async () => {
//   try {
//     await context.close();
//     Logger.log('Scenario finished3');
//   } catch (error) {
//     Logger.error(`Error in afterAll: ${(error as Error).message}`);
//     throw error;
//   }
// });

// test('University: open and submit form', async () => {
//   try {
//     await home.goto();
//     await home.openForUniversities();
//     await formPage.fillForm();
//     const msg = (await formPage.getErrorMessage()) ?? '';
//     Logger.log(msg);
//   } catch (error) {
//     Logger.error(`Error in University form submission: ${(error as Error).message}`);
//     throw error;
//   }
// });

// test('University: re-submit and validate error', async () => {
//   try {
//     await formPage.fillForm();
//     const msg = (await formPage.getErrorMessage()) ?? '';
//     Logger.log(msg);
//   } catch (error) {
//     Logger.error(`Error in University re-submission: ${(error as Error).message}`);
//     throw error;
//   }
// });
