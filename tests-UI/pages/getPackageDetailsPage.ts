import { Page } from '@playwright/test';

export default class GetPackageDetailsPage{
    private page: Page;
    constructor(page: Page) {
        this.page = page;        
    }

 
}
