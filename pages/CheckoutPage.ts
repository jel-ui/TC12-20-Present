import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
    constructor(private readonly page: Page) {}

    async clickProceedToCheckout() {
        await this.page.getByText('Proceed To Checkout', { exact: true }).click();
    }

    async proceed() { 
        await this.page.getByText('Proceed To Checkout', { exact: true }).click(); 
    }

    async expectAddressVisible() {
        await expect(
            this.page.locator('#address_delivery'))
        .toBeVisible();

        await expect(
            this.page.locator('#address_invoice'))
        .toBeVisible();
    }

    async expectOrderReviewVisible() { 
        await expect(
            this.page.locator('#cart_info'))
        .toBeVisible(); 
    }
    async enterComment(comment: string) {
        await this.page.locator('[name="message"]').fill(comment);
    }

    async placeOrder() {
        await this.page.getByRole('link', { name: 'Place Order' }).click(); 
    }

    async clickPlaceOrder() {
        await this.page.getByRole('link', { name: 'Place Order' }).click();
    }

    async enterNameOnCard() {
        await this.page.locator('[name="name_on_card"]').fill('Tran Nam');
    }

    async enterCardNumber() {
        await this.page.locator('[name="card_number"]').fill('1234567890123456');
    }

    async enterCVC() {
        await this.page.getByRole('textbox', { name: 'ex. 311' }).fill('123');
    }

    async enterExpirationMonth() {
        await this.page.getByRole('textbox', { name: 'MM' }).fill('12');
    }

    async enterExpirationYear() {
        await this.page.getByRole('textbox', { name: 'YYYY' }).fill('2030');
    }

    async enterPaymentDetails(details: Record<string, string>) {
        await this.page.locator('[name="name_on_card"]').fill(details['Name on Card']);
        await this.page.locator('[name="card_number"]').fill(details['Card Number']);
        await this.page.getByRole('textbox', { name: 'ex. 311' }).fill(details['CVC']);
        await this.page.getByRole('textbox', { name: 'MM' }).fill(details['Expiration Month']);
        await this.page.getByRole('textbox', { name: 'YYYY' }).fill(details['Expiration Year']);
    }

    async confirmOrder() {
        await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    }

    async clickPayAndConfirmOrder() {
        await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    }
    
    async expectSuccessMessage() {
        await expect(this.page.getByText(
            /Your order has been placed successfully!|Congratulations!\s*Your order has been confirmed!/i
        )).toBeVisible({ timeout: 30_000 });
    }

    async expectDeliveryAddressMatchesRegistration() {
        const deliveryAddress = this.page.locator('#address_delivery');
        await expect(deliveryAddress).toContainText('Tran');
        await expect(deliveryAddress).toContainText('Nam');
        await expect(deliveryAddress).toContainText('D2 Street, Thu Duc City, Ho Chi Minh City');
        await expect(deliveryAddress).toContainText('California');
        await expect(deliveryAddress).toContainText('New York City');
        await expect(deliveryAddress).toContainText('100000');
        await expect(deliveryAddress).toContainText('United States');
        await expect(deliveryAddress).toContainText('1231231235');
    }

    async expectBillingAddressMatchesRegistration() {
        const billingAddress = this.page.locator('#address_invoice');
        await expect(billingAddress).toContainText('Tran');
        await expect(billingAddress).toContainText('Nam');
        await expect(billingAddress).toContainText('D2 Street, Thu Duc City, Ho Chi Minh City');
        await expect(billingAddress).toContainText('California');
        await expect(billingAddress).toContainText('New York City');
        await expect(billingAddress).toContainText('100000');
        await expect(billingAddress).toContainText('United States');
        await expect(billingAddress).toContainText('1231231235');
    }

    async expectAddressesMatchRegistration(details: Record<string, string>) {
        const deliveryAddress = this.page.locator('#address_delivery');
        const billingAddress = this.page.locator('#address_invoice');

        for (const expectedValue of Object.values(details)) {
            await expect(deliveryAddress).toContainText(expectedValue);
            await expect(billingAddress).toContainText(expectedValue);
        }
    }
}
