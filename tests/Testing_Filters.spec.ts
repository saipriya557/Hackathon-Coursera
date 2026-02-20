import { BrowserContext, Page } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { CourseCard } from '../components/CourseCard';
import { Logger } from '../utils/logger';
import testData from '../testdata/testdata.json';

type CourseDetails = {
  name: string;
  rating: string | number;
  hours: string | number;
};

test.describe.configure({ mode: 'serial' });

let context: BrowserContext;
let page: Page;
let home: HomePage;
let searchPage: SearchPage;
let courseCard: CourseCard;

test.beforeAll(async ({ browser }) => {
  try {
    Logger.log('Scenario started1');
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
    searchPage = new SearchPage(page);
    courseCard = new CourseCard(page);
  } catch (error) {
    Logger.error(`Error in beforeAll: ${(error as Error).message}`);
    throw error;
  }
});

test.afterAll(async () => {
  try {
    await context.close();
    Logger.log('Scenario finished1');
  } catch (error) {
    Logger.error(`Error in afterAll: ${(error as Error).message}`);
    throw error;
  }
});

test('Search: navigate and search', async () => {
  try {
    await home.goto();
    await home.searchCourse(testData.search.courseName);
  } catch (error) {
    Logger.error(`Error in Search: navigate and search: ${(error as Error).message}`);
    throw error;
  }
});

test('Search: apply filters', async () => {
  try {
    await searchPage.filterByLanguage(testData.search.language);
    await searchPage.filterByLevel(testData.search.level);
  } catch (error) {
    Logger.error(`Error in Search: apply filters: ${(error as Error).message}`);
    throw error;
  }
});

test('Search: read top 2 course cards', async () => {
  try {
    for (let i = 0; i < 2; i++) {
      try {
        const raw = await courseCard.getCourseDetails(i) as {
          name: string | null;
          rating?: string | number;
          hours?: string | number;
        };
        const details: CourseDetails = {
          name: raw.name ?? '',
          rating: raw.rating ?? '',
          hours: raw.hours ?? '',
        };
        Logger.log(`Course: ${details.name}, Rating: ${details.rating}, Hours: ${details.hours}`);
      } catch (innerError) {
        Logger.error(`Error reading course card ${i}: ${(innerError as Error).message}`);
        // continue loop even if one card fails
      }
    }
  } catch (error) {
    Logger.error(`Error in Search: read top 2 course cards: ${(error as Error).message}`);
    throw error;
  }
});
