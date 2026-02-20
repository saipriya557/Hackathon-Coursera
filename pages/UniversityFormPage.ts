// import { Page } from '@playwright/test';
// import testData from '../testdata/testdata.json';

// export class UniversityFormPage {
//   constructor(private page: Page) {}

//  async fillForm() {
//   const data = testData.universityForm;

//   await this.page.getByPlaceholder('First Name').fill(data.firstName);
//   await this.page.getByPlaceholder('Last Name').fill(data.lastName);
//   await this.page.getByPlaceholder('Work Email Address').fill(data.email);
//   await this.page.getByPlaceholder("Country Code + Phone Number").fill(data.phone);
//   await this.page.locator('#Institution_Type__c').selectOption({ value: data.institutionType });
//   await this.page.getByPlaceholder("Institution Name").fill(data.institutionName);
//   await this.page.locator("#Title").selectOption({ value: data.title });
//   await this.page.locator('#Department').selectOption({ value: data.department });
//   await this.page.locator('#Self_Reported_Needs__c').selectOption({ value: data.needs });
//   await this.page.locator('#Country').selectOption({ value: data.country });

//   const checkbox = this.page.locator('#mktoCheckbox_126460_0');
//   if (await checkbox.isVisible()) await checkbox.click();

//   const state = this.page.locator('#State');
//   if (await state.isVisible()) await state.selectOption({ value: data.state });

//   await this.page.locator('.mktoButtonWrap.mktoRound').click();
// }

//   async getErrorMessage() {
//     return await this.page.locator('#ValidMsgEmail').textContent();
//   }
// }


import { Page, expect } from '@playwright/test';
import testData from '../testdata/testdata.json';

export class UniversityFormPage {
  constructor(private page: Page) {}

  async fillForm() {
    const data = testData.universityForm;

    // First Name
    const firstName = this.page.getByPlaceholder('First Name');
    //await expect(firstName).toBeVisible();
    await firstName.fill(data.firstName);
    await expect(firstName).toHaveValue(data.firstName);

    // Last Name
    const lastName = this.page.getByPlaceholder('Last Name');
    //await expect(lastName).toBeVisible();
    await lastName.fill(data.lastName);
    await expect(lastName).toHaveValue(data.lastName);

    // Email
    const email = this.page.getByPlaceholder('Work Email Address');
    //await expect(email).toBeVisible();
    await email.fill(data.email);
    await expect(email).toHaveValue(data.email);

    // Phone
    const phone = this.page.getByPlaceholder("Country Code + Phone Number");
    //await expect(phone).toBeVisible();
    await phone.fill(data.phone);
    await expect(phone).toHaveValue(data.phone);

    // Institution Type (dropdown)
    const institutionType = this.page.locator('#Institution_Type__c');
    await expect(institutionType).toBeVisible();
    await institutionType.selectOption({ value: data.institutionType });
    await expect(institutionType).toHaveValue(data.institutionType);

    // Institution Name
    const institutionName = this.page.getByPlaceholder("Institution Name");
    await expect(institutionName).toBeVisible();
    await institutionName.fill(data.institutionName);
    await expect(institutionName).toHaveValue(data.institutionName);

    // Title (dropdown)
    const title = this.page.locator("#Title");
    await expect(title).toBeVisible();
    await title.selectOption({ value: data.title });
    await expect(title).toHaveValue(data.title);

    // Department (dropdown)
    const department = this.page.locator('#Department');
    await expect(department).toBeVisible();
    await department.selectOption({ value: data.department });
    await expect(department).toHaveValue(data.department);

    // Needs (dropdown)
    const needs = this.page.locator('#Self_Reported_Needs__c');
    await expect(needs).toBeVisible();
    await needs.selectOption({ value: data.needs });
    await expect(needs).toHaveValue(data.needs);

    // Country (dropdown)
    const country = this.page.locator('#Country');
    await expect(country).toBeVisible();
    await country.selectOption({ value: data.country });
    await expect(country).toHaveValue(data.country);

    // Checkbox (optional)
    const checkbox = this.page.locator('#mktoCheckbox_126460_0');
    if (await checkbox.isVisible()) {
      await expect(checkbox).toBeVisible();
      await checkbox.click();
      await expect(checkbox).toBeChecked();
    }

    // State (optional dropdown)
    const state = this.page.locator('#State');
    if (await state.isVisible()) {
      await expect(state).toBeVisible();
      await state.selectOption({ value: data.state });
      await expect(state).toHaveValue(data.state);
    }

    // Submit button
    const submitButton = this.page.locator('.mktoButtonWrap.mktoRound');
    await expect(submitButton).toBeVisible();
    await submitButton.click();
  }

  async getErrorMessage() {
    const errorMessage = this.page.locator('#ValidMsgEmail');
    await expect(errorMessage).toBeVisible();
    return await errorMessage.textContent();
  }
}



