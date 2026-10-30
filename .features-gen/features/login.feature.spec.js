// Generated from: features\login.feature
import { test } from "playwright-bdd";

test.describe('Playwright Home Page', () => {

  test('Verify Home Page Title', async ({ Given, Then, page }) => { 
    await Given('I open the Playwright home page', null, { page }); 
    await Then('I should see the title "Playwright"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I open the Playwright home page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Outcome","textWithKeyword":"Then I should see the title \"Playwright\"","stepMatchArguments":[{"group":{"start":23,"value":"\"Playwright\"","children":[{"start":24,"value":"Playwright","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end