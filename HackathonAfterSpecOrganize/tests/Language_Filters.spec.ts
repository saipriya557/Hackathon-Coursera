import { BrowserContext, Page } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { Logger } from '../utils/logger';
import testData from '../testdata/testdata.json';

test.describe.configure({ mode: 'serial' });

let context: BrowserContext;
let page: Page;
let home: HomePage;
let searchPage: SearchPage;

test.beforeAll(async ({ browser }) => {
  Logger.log('Scenario started2');
  context = await browser.newContext();
  page = await context.newPage();
  home = new HomePage(page);
  searchPage = new SearchPage(page);
});

test.afterAll(async () => {
  await context.close();
  Logger.log('Scenario finished2');
});

test('Filters: open and count languages', async () => {
  await home.goto();
  await home.searchCourse('Language Learning');
  await searchPage.openLanguageFilter();
  const languageOptions = await searchPage.getLanguageOptions();
  const count = await languageOptions.count();
  Logger.log(`Available language filters: ${count}`);
});



test('Filters: iterate languages 0-4 and list levels', async () => {
  const languageOptions = await searchPage.getLanguageOptions();
  const count = await languageOptions.count();
  Logger.log(`Available language filters: ${count}`);

  const view = page.getByRole('button', { name: 'View' });

  for (let j = 0; j < 4; j++) {
    Logger.log(`Filter ${j}: ${await languageOptions.nth(j).innerText()}`);
    await languageOptions.nth(j).click();
    await searchPage.applyView();
    await searchPage.openLevelFilter();
      await page.waitForTimeout(2000);

    const levelOptions = await searchPage.getLevelOptions();
    const levelCount = await levelOptions.count();
    for (let k = 0; k < levelCount; k++) {
      const text = (await levelOptions.nth(k).textContent()) ?? '';
      Logger.log(text);
    }

    await searchPage.applyView();
    await searchPage.openLanguageFilter();
    await searchPage.clearFilters();
  }
});