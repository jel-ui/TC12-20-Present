import { expect, type Page } from '@playwright/test';

export type SignupDetails = { name: string; email: string };

export class AccountPage {
    constructor(private readonly page: Page) {}

    async expectSignupFormVisible() {
        await expect(this.page.getByText('New User Signup!', { exact: true })).toBeVisible();
    }

    async openRegisterLogin() {
        await this.page.getByText('Register / Login', { exact: true }).click();
    }

    async enterSignupNameAndEmail(details: SignupDetails) {
        await this.page.locator('[data-qa="signup-name"]').fill(details.name);
        await this.page.locator('[data-qa="signup-email"]').fill(details.email);
    }

    async clickSignup() {
        await this.page.getByRole('button', { name: 'Signup' }).click();
    }

    async enterSignupPassword() {
        await this.page.getByLabel('Password *').fill('12345');
    }

    async enterFirstName() {
        await this.page.getByRole('textbox', { name: 'First name *' }).fill('Tran');
    }

    async enterLastName() {
        await this.page.getByRole('textbox', { name: 'Last name *' }).fill('Nam');
    }

    async enterAddress() {
        await this.page.getByRole('textbox', {
            name: 'Address * (Street address, P.O. Box, Company name, etc.)'
        }).fill('D2 Street, Thu Duc City, Ho Chi Minh City');
    }

    async selectCountry() {
        await this.page.getByRole('combobox', { name: 'Country *' })
            .selectOption({ label: 'United States' });
    }

    async enterState() {
        await this.page.getByRole('textbox', { name: 'State *' }).fill('California');
    }

    async enterCity() {
        await this.page.getByRole('textbox', { name: 'City *' }).fill('New York City');
    }

    async enterZipcode() {
        await this.page.locator('#zipcode').fill('100000');
    }

    async enterMobileNumber() {
        await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill('1231231235');
    }

    async clickCreateAccount() {
        await this.page.getByRole('button', { name: 'Create Account' }).click();
    }

    async expectCreatedMessage() {
        await expect(this.page.locator('b:has-text("ACCOUNT CREATED!")')).toBeVisible();
    }

    async clickContinue() {
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }

    async expectLoggedInAs(name: string) {
        await expect(this.page.getByText('Logged in as ' + name, { exact: true })).toBeVisible();
    }

    async enterLoginEmail(email: string) {
        await this.page.locator('[data-qa="login-email"]').fill(email);
    }

    async enterLoginPassword(password: string) {
        await this.page.locator('[data-qa="login-password"]').fill(password);
    }

    async clickLogin() {
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async clickDeleteAccount() {
        await this.page.getByRole('link', { name: 'Delete Account' }).click();
    }

    async expectDeletedMessage() {
        await expect(this.page.locator('b:has-text("ACCOUNT DELETED!")')).toBeVisible();
    }

    async enterAccountDetails(details: Record<string, string>) {
        await this.page.getByLabel('Password *').fill(details['Password']);
        await this.page.getByRole('textbox', { name: 'First name *' }).fill(details['First name']);
        await this.page.getByRole('textbox', { name: 'Last name *' }).fill(details['Last name']);
        await this.page.getByRole('textbox', {
            name: 'Address * (Street address, P.O. Box, Company name, etc.)'
        }).fill(details['Address']);
        await this.page.getByRole('combobox', { name: 'Country *' })
            .selectOption({ label: details['Country'] });
        await this.page.getByRole('textbox', { name: 'State *' }).fill(details['State']);
        await this.page.getByRole('textbox', { name: 'City *' }).fill(details['City']);
        await this.page.locator('#zipcode').fill(details['Zipcode']);
        await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(details['Mobile Number']);
    }}
