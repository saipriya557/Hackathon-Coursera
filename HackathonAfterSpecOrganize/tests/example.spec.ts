// // tests/coursera.spec.ts
// import { test } from '../fixtures/test-fixture';
// import { HomePage } from '../pages/HomePage';
// import { SearchPage } from '../pages/SearchPage';
// import { UniversityFormPage } from '../pages/UniversityFormPage';
// import { CourseraPlusPage } from '../pages/CourseraPlusPage';
// import { CourseCard } from '../components/CourseCard';
// import { Logger } from '../utils/logger';

// // Keep your strict type — we'll normalize at the call site
// type CourseDetails = {
//   name: string;
//   rating: string | number;
//   hours: string | number;
// };

// test.beforeEach(async ({ page }) => {
//   Logger.log('Starting test...');
// });

// test.afterEach(async ({ page }) => {
//   Logger.log('Test finished.');
// });

// test('Search Web Development Courses', async ({ page }) => {
//   const home = new HomePage(page);
//   const searchPage = new SearchPage(page);
//   const courseCard = new CourseCard(page);

//   await home.goto();
//   await home.searchCourse('Web development Courses');
//   await searchPage.filterByLanguage('English');
//   await searchPage.filterByLevel('Beginner');

//   for (let i = 0; i < 2; i++) {
//     const raw = await courseCard.getCourseDetails(i) as {
//       name: string | null;
//       rating?: string | number;
//       hours?: string | number;
//     };

//     const details: CourseDetails = {
//       name: raw.name ?? '',
//       rating: raw.rating ?? '',
//       hours: raw.hours ?? '',
//     };

//     Logger.log(`Course: ${details.name}, Rating: ${details.rating}, Hours: ${details.hours}`);
//   }
// });

// test('Language Learning Filters', async ({ page }) => {
//   const home = new HomePage(page);
//   const searchPage = new SearchPage(page);

//   await home.goto();
//   await home.searchCourse('Language Learning');

//   await searchPage.openLanguageFilter();
//   const languageOptions = await searchPage.getLanguageOptions();
//   const count = await languageOptions.count();
//   Logger.log(`Available language filters: ${count}`);

//   const view = page.getByRole('button', { name: 'View' }); // kept for parity with original code

//   for (let j = 0; j < 4; j++) {
//     // Prefer innerText() to avoid string | null
//     Logger.log(`Filter ${j}: ${await languageOptions.nth(j).innerText()}`);
//     await languageOptions.nth(j).click();
//     await searchPage.applyView();
//     await searchPage.openLevelFilter();
//     // await page.waitForTimeout(20000);

//     const levelOptions = await searchPage.getLevelOptions();
//     const levelCount = await levelOptions.count();
//     for (let k = 0; k < levelCount; k++) {
//       const text = (await levelOptions.nth(k).textContent()) ?? '';
//       Logger.log(text);
//     }

//     await searchPage.applyView();
//     await searchPage.openLanguageFilter();
//     await searchPage.clearFilters();
//   }
// });

// test('University Form Submission', async ({ page }) => {
//   const home = new HomePage(page);
//   const formPage = new UniversityFormPage(page);

//   await home.goto();
//   await home.openForUniversities();
//   await formPage.fillForm();
//   Logger.log((await formPage.getErrorMessage()) ?? '');
// });

// test('Coursera Plus Pricing', async ({ page }) => {
//   const home = new HomePage(page);
//   const plusPage = new CourseraPlusPage(page);

//   await home.goto();
//   await home.openCourseraPlus();
//   const prices = await plusPage.getPricing();
//   prices.forEach(price => Logger.log(price ?? ''));
// });