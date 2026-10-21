import { expect, type Page } from '@playwright/test';

export class ProductsPage {
    constructor(private readonly page: Page) {}
    private productCard(index: number) {
        return this.page.locator('.product-image-wrapper').nth(index) 
    }

    async hoverProduct(index: number) {
        await this.productCard(index).hover();
    }

    async clickAddToCartForProduct(index: number) {
        await this.productCard(index).locator('a.add-to-cart').first().click();
    }

    async clickContinueShopping() {
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    }

    async clickAddToCartOnDetailPage() {
        await this.page.getByRole('button', { name: 'Add to cart' }).click();
    }
    async addProduct(index: number) {
        const product = this.productCard(index);
        await product.hover();
        await product.locator('a.add-to-cart').first().click();
    }

    async addProductAndContinue(index: number) {
        await this.addProduct(index);
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    }

    async openFirstProductDetail() {
        await this.page.locator('a').filter({ hasText: 'View Product' }).first().click();
    }

    async expectProductDetailVisible() {
        await expect(
            this.page.locator('div.product-information'))
        .toBeVisible();
    }

    async setQuantity(quantity: number) {
        await this.page.locator('#quantity').fill(String(quantity));
    }
    
    async addCurrentProductToCart() {
        await this.page.getByRole('button', { name: 'Add to cart' }).click();
    }

    async expectAllProductsHeadingVisible() {
        await expect(this.page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    }

    async searchForProduct(searchWord: string) {
        await this.page.getByRole('textbox', { name: 'Search Product' }).fill(searchWord);
        await this.page.locator('#submit_search').click();
    }

    async expectSearchedProductsHeadingVisible() {
        await expect(this.page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
    }

    async getSearchResultNames(searchWord: string) {
        const productCards = this.page.locator('.product-image-wrapper');
        const productCount = await productCards.count();

        expect(productCount).toBeGreaterThan(0);

        const productNames: string[] = [];

        for (let i = 0; i < productCount; i++) {
            const productCard = productCards.nth(i);

            await expect(productCard).toBeVisible();

            const nameLocator = productCard.locator('.productinfo p');
            const productName = await nameLocator.innerText();

            expect(productName.toLowerCase()).toContain(searchWord.toLowerCase());

            productNames.push(productName.trim());
        }

        return productNames;
    }

    async addAllSearchResultsToCart() {
        const productCards = this.page.locator('.product-image-wrapper');
        const productCount = await productCards.count();
        expect(productCount).toBeGreaterThan(0);

        for (let i = 0; i < productCount; i++) {
            const productCard = productCards.nth(i);
            await productCard.hover();
            await productCard.locator('a.add-to-cart').first().click();
            await this.clickContinueShopping();
        }
    }
}
