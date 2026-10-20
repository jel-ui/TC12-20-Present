import { expect, type Page } from '@playwright/test';

export class CartPage {
    constructor(private readonly page: Page) {}

    async clickViewCart() {
        await this.page.getByText('View Cart', { exact: true }).click();
    }

    async clickCartInNavigation() {
        await this.page.getByRole('link', { name: 'Cart' }).click();
    }

    async expectVisible() {
        await expect(this.page.locator('#cart_info')).toBeVisible();
    }

    async expectFirstProductVisible() {
        await expect(this.page.locator('#product-1')).toBeVisible();
    }

    async expectSecondProductVisible() {
        await expect(this.page.locator('#product-2')).toBeVisible();
    }

    async expectProductPricesQuantitiesAndTotals() {
        const firstProduct = this.page.locator('#product-1').locator('td');
        await expect(firstProduct.nth(2)).toHaveText('Rs. 500');
        await expect(firstProduct.nth(3)).toHaveText('1');
        await expect(firstProduct.nth(4)).toHaveText('Rs. 500');

        const secondProduct = this.page.locator('#product-2').locator('td');
        await expect(secondProduct.nth(2)).toHaveText('Rs. 400');
        await expect(secondProduct.nth(3)).toHaveText('1');
        await expect(secondProduct.nth(4)).toHaveText('Rs. 400');
    }

    async expectFirstProductQuantity(quantity: number) {
        await expect(this.page.locator('#product-1').locator('td').nth(3))
            .toHaveText(String(quantity));
    }

    async expectProductsVisible(productNames: string[]) {
        const cart = this.page.locator('#cart_info');
        await expect(cart).toBeVisible();
        for (const productName of productNames) {
            await expect(cart).toContainText(productName);
        }
    }

    async expectProductsFromTable(products: Array<Record<string, string>>) {
        for (let i = 0; i < products.length; i++) {
            let rowNumber: number;
            if (products[i].Product === 'First product') {
                rowNumber = 1;
            } else if (products[i].Product === 'Second product') {
                rowNumber = 2;
            } else {
                throw new Error('Use First product or Second product in the Product column.');
            }

            const productRow = this.page.locator('#product-' + rowNumber);
            await expect(productRow).toBeVisible();
            if (products[i].Price) {
                await expect(productRow.locator('td').nth(2)).toHaveText(products[i].Price);
            }
            if (products[i].Quantity) {
                await expect(productRow.locator('td').nth(3)).toHaveText(products[i].Quantity);
            }
            if (products[i].Total) {
                await expect(productRow.locator('td').nth(4)).toHaveText(products[i].Total);
            }
        }
    }
}
