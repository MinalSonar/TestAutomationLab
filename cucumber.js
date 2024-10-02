/*eslint-disable*/


let test = [
  './tests-UI/features/*.feature',  
  '--require ./tests-UI/step-definitions/*.ts',
  '--require ./tests-UI/common/*.ts',
  '--require-module ts-node/register',  
  '--format html:reports/cucumber-report.html',   
  
].join(' ');

module.exports = {
  default: test
};