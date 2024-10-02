import { setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';

let browser: Browser;
let page: Page;

export async function init() {
  console.log('Launching browser...');
  browser = await chromium.launch();
  page = await browser.newPage();
  return { browser, page };
}

export async function close() {
  await page.close();
  await browser.close();
}

export { page };

export class Common extends CucumberWorld {
  constructor(options: any) {
    super(options);
  }
}

setWorldConstructor(Common);
