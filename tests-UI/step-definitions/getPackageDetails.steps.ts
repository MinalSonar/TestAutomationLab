import { Given, When, Then, After, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { init, page, close } from '../common/common';
import  GetPackageDetailsPage  from '../pages/getPackageDetailsPage';

setDefaultTimeout(100 * 1000);
Given('User open the Airalo website',{ timeout: 100 * 1000 }, async () => {
  await init();
  await page.goto('https://www.airalo.com');
});

Then('the title should be {string}', async (expectedTitle: string) => {
  const actualTitle = await page.title();
  expect(actualTitle).toBe(expectedTitle);
  console.log('Title on Page:',actualTitle);
});

When('user type {string} in search field on homepage', async (searchText: string) => {
  await page.fill('//input[@data-testid="search-input"]', searchText);
});

Then('user select {string} from options', async (optionText: string) => {
  await page.click(`text=${optionText}`);
});

Then('user select first package from list', async () => {
  await page.click('.package-list .package-item:first-child');
});

Then('user select first package from list and click on buy now', async () => {
  await page.click('.package-list-wrapper .sim-item-link:first-child[href$="/japan-esim/moshi-moshi-7days-1gb"] .btn-sim-item-btn');
});

Then('package details popup appears', async () => {
  await page.isVisible('//div[@data-testid="package-detail"]');
});

Then('user verify following details on popup', async (dataTable) => { 
  
  const expectedPackageDetails = dataTable.rowsHash();
  const listItemsOnPackageDetails = await page.locator('ul[data-testid="sim-detail-info-list"] li');
  const actualPackageDetails: { [key: string]: string } = {};
  const count = await listItemsOnPackageDetails.count();
  for (let i = 0; i < count; i++) {
    const keyElement = listItemsOnPackageDetails.nth(i).locator('.key');
    const valueElement = listItemsOnPackageDetails.nth(i).locator('.value');
    
    const key = await keyElement.innerText();
    const value = await valueElement.innerText();    

    if (key && value) {
      actualPackageDetails[key.trim()] = value.replace(/\s+/g, ' ').trim();
      console.log(value);
    }
    for (const [key, value] of Object.entries(expectedPackageDetails)) {
    expect(actualPackageDetails[key]).toEqual(value);
    console.log('Package Details:',actualPackageDetails[key]);
    }
  }
});  

After(async () => {
  await close();
});