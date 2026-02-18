import { Page } from '@playwright/test';
import testData from '../testdata/testdata.json';

export class UniversityFormPage {
  constructor(private page: Page) {}

 async fillForm() {
  const data = testData.universityForm;

  await this.page.getByPlaceholder('First Name').fill(data.firstName);
  await this.page.getByPlaceholder('Last Name').fill(data.lastName);
  await this.page.getByPlaceholder('Work Email Address').fill(data.email);
  await this.page.getByPlaceholder("Country Code + Phone Number").fill(data.phone);
  await this.page.locator('#Institution_Type__c').selectOption({ value: data.institutionType });
  await this.page.getByPlaceholder("Institution Name").fill(data.institutionName);
  await this.page.locator("#Title").selectOption({ value: data.title });
  await this.page.locator('#Department').selectOption({ value: data.department });
  await this.page.locator('#Self_Reported_Needs__c').selectOption({ value: data.needs });
  await this.page.locator('#Country').selectOption({ value: data.country });

  const checkbox = this.page.locator('#mktoCheckbox_126460_0');
  if (await checkbox.isVisible()) await checkbox.click();

  const state = this.page.locator('#State');
  if (await state.isVisible()) await state.selectOption({ value: data.state });

  await this.page.locator('.mktoButtonWrap.mktoRound').click();
}

  async getErrorMessage() {
    return await this.page.locator('#ValidMsgEmail').textContent();
  }
}



