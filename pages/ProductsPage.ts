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
        // TODO: Lấy locator của heading "ALL PRODUCTS" trong trang Products (Inspect heading bằng DevTools).
        await expect(this.page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    }

    async searchForProduct(searchWord: string) {
        // TODO: Lấy locator của ô Search Product trên trang Products (Inspect ô input bằng DevTools).
        // TODO: Lấy locator của nút Search cạnh ô tìm kiếm (Inspect nút bằng DevTools).
        await this.page.getByRole('textbox', { name: 'Search Product' }).fill(searchWord);
        await this.page.locator('#submit_search').click();
    }

    async expectSearchedProductsHeadingVisible() {
        // TODO: Lấy locator của heading "SEARCHED PRODUCTS" trên trang Products (Inspect heading bằng DevTools).
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

            const cardText = (await productCard.innerText()).split('\n').map(line => line.trim()).filter(Boolean);
            expect(cardText.join(' ').toLowerCase()).toContain(searchWord.toLowerCase());

            const productName = cardText.find(line =>
                !line.startsWith('Rs.') && !/add to cart|view product/i.test(line)
            );
            if (!productName) {
                throw new Error('Could not read a product name from a visible search result.');
            }
            productNames.push(productName);
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
