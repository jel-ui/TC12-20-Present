import { DataTable, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

When('I click Register or Login', async function (this: CustomWorld) {
    await this.accountPage.openRegisterLogin();
});

When('I enter signup name and email', async function (this: CustomWorld) {
    const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    this.signupName = 'Student' + id;
    this.signupEmail = 'student' + id + '@gmail.com';
    await this.accountPage.enterSignupNameAndEmail({
        name: this.signupName,
        email: this.signupEmail
    });
});


When('I enter account details:', async function (this: CustomWorld, table: DataTable) {
    await this.accountPage.enterAccountDetails(table.rowsHash());
});
When('I click Signup', async function (this: CustomWorld) {
    await this.accountPage.clickSignup();
});

When('I enter the signup password', async function (this: CustomWorld) {
    await this.accountPage.enterSignupPassword();
});

When('I enter the first name', async function (this: CustomWorld) {
    await this.accountPage.enterFirstName();
});

When('I enter the last name', async function (this: CustomWorld) {
    await this.accountPage.enterLastName();
});

When('I enter the address', async function (this: CustomWorld) {
    await this.accountPage.enterAddress();
});

When('I select the country', async function (this: CustomWorld) {
    await this.accountPage.selectCountry();
});

When('I enter the state', async function (this: CustomWorld) {
    await this.accountPage.enterState();
});

When('I enter the city', async function (this: CustomWorld) {
    await this.accountPage.enterCity();
});

When('I enter the zipcode', async function (this: CustomWorld) {
    await this.accountPage.enterZipcode();
});

When('I enter the mobile number', async function (this: CustomWorld) {
    await this.accountPage.enterMobileNumber();
});

When('I click Create Account', async function (this: CustomWorld) {
    await this.accountPage.clickCreateAccount();
});

Then('the account created message is displayed', async function (this: CustomWorld) {
    await this.accountPage.expectCreatedMessage();
});

When('I click Continue after account creation', async function (this: CustomWorld) {
    await this.accountPage.clickContinue();
});

Then('I am logged in as the new user', async function (this: CustomWorld) {
    await this.accountPage.expectLoggedInAs(this.signupName);
});

When('I click Delete Account', async function (this: CustomWorld) {
    await this.accountPage.clickDeleteAccount();
});

Then('the account deleted message is displayed', async function (this: CustomWorld) {
    await this.accountPage.expectDeletedMessage();
});

When('I click Continue after account deletion', async function (this: CustomWorld) {
    await this.accountPage.clickContinue();
});

Then('the signup form is displayed', async function (this: CustomWorld) {
    await this.accountPage.expectSignupFormVisible();
});
