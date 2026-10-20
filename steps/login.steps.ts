import { DataTable, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

When('I enter the existing account email', async function (this: CustomWorld) {
    await this.accountPage.enterLoginEmail('tc16.user@gmail.com');
});

When('I enter the existing account password', async function (this: CustomWorld) {
    await this.accountPage.enterLoginPassword('12345');
});


When('I enter existing login details:', async function (this: CustomWorld, table: DataTable) {
    const loginDetails = table.rowsHash();
    await this.accountPage.enterLoginEmail(loginDetails['Email']);
    await this.accountPage.enterLoginPassword(loginDetails['Password']);
    this.existingUsername = loginDetails['Username'];
});
When('I click Login', async function (this: CustomWorld) {
    await this.accountPage.clickLogin();
});

Then('I am logged in as the existing user', async function (this: CustomWorld) {
    await this.accountPage.expectLoggedInAs(this.existingUsername);
});
