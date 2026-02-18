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
  Logger.log('Scenario started1');
  context = await browser.newContext();
  page = await context.newPage();
  home = new HomePage(page);
  searchPage = new SearchPage(page);
  courseCard = new CourseCard(page);
});

test.afterAll(async () => {
  await context.close();
  Logger.log('Scenario finished1');
});

test('Search: navigate and search', async () => {
  await home.goto();
  await home.searchCourse(testData.search.courseName);
});

test('Search: apply filters', async () => {
  await searchPage.filterByLanguage(testData.search.language);
  await searchPage.filterByLevel(testData.search.level);
});

test('Search: read top 2 course cards', async () => {
  for (let i = 0; i < 2; i++) {
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
  }
});