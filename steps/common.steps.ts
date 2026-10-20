import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('I open the homepage', async function (this: CustomWorld) {
    await this.homePage.open();
});

Then('the homepage is visible', async function (this: CustomWorld) {
    await this.homePage.expectVisible();
});

When('I open the Products page', async function (this: CustomWorld) {
    await this.homePage.openProducts();
});

When('I click Signup \\/ Login', async function (this: CustomWorld) {
    await this.homePage.openSignupLogin();
});

//Click - verify tech
