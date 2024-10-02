import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests-API/tests', 
  retries: 0, 
  use: {
    headless: false, 
    viewport: { width: 1280, height: 720 }, 
    ignoreHTTPSErrors: true,    
    screenshot: 'only-on-failure', 
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
   
  ],
  outputDir: 'test-results/', 
  reporter: [['html', { outputFolder: 'playwright-report' }]], 
};

export default config;