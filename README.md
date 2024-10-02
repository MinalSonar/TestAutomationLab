# Cucumber and Playwright Test Setup
Test automation repository containing UI and API Test automation suite 
This project uses Cucumber and playwright for UI and API testing.

# Pre-Requisites

- Node.js 
- npm 

# Installation

1. Clone the repository:
   
   https://github.com/MinalSonar/TestAutomationLab.git

2. Install dependencies
   `npm install`

3. Install Playwright
   `npx playwright install`

# Project Structure:

features/: Contains Cucumber feature files.
step_definitions/: Contains step definitions.
tests/: Contains Playwright test files.
playwright.config.ts: Configuration file for Playwright.
cucumber.js: Configuration file for Cucumber.
.gitignore: ignore directories or files you don’t want to track

# Running Tests
To run Cucumber tests:

`npx cucumber-js`

To run PlaywrightTests:

`npx playwright test`

