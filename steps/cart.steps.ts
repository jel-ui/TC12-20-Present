import { DataTable, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

When('I hover over the first product', async function (this: CustomWorld) {
    await this.productsPage.hoverProduct(0);
});

When('I click Add to cart for the first product', async function (this: CustomWorld) {
    await this.productsPage.clickAddToCartForProduct(0);
});

When('I hover over the second product', async function (this: CustomWorld) {
    await this.productsPage.hoverProduct(1);
});

When('I click Add to cart for the second product', async function (this: CustomWorld) {
    await this.productsPage.clickAddToCartForProduct(1);
});

When('I click Continue Shopping', async function (this: CustomWorld) {
    await this.productsPage.clickContinueShopping();
});

When('I click View Product for the first product', async function (this: CustomWorld) {
    await this.productsPage.openFirstProductDetail();
});

Then('the product detail page is displayed', async function (this: CustomWorld) {
    await this.productsPage.expectProductDetailVisible();
});

When('I set the product quantity using:', async function (this: CustomWorld, table: DataTable) {
    const quantityData = table.rowsHash();
    await this.productsPage.setQuantity(Number(quantityData['Quantity']));
});

When('I click Add to cart on the product detail page', async function (this: CustomWorld) {
    await this.productsPage.clickAddToCartOnDetailPage();
});

When('I click View Cart', async function (this: CustomWorld) {
    await this.cartPage.clickViewCart();
});

When('I click Cart in the navigation menu', async function (this: CustomWorld) {
    await this.cartPage.clickCartInNavigation();
});

Then('the cart page is displayed', async function (this: CustomWorld) {
    await this.cartPage.expectVisible();
});

Then('the first product is displayed in the cart', async function (this: CustomWorld) {
    await this.cartPage.expectFirstProductVisible();
});

Then('the second product is displayed in the cart', async function (this: CustomWorld) {
    await this.cartPage.expectSecondProductVisible();
});

Then('the product prices, quantities, and totals are correct', async function (this: CustomWorld) {
    await this.cartPage.expectProductPricesQuantitiesAndTotals();
});

Then('the product quantity in the cart is 4', async function (this: CustomWorld) {
    await this.cartPage.expectFirstProductQuantity(4);
});

Then('the cart has the following products:', async function (this: CustomWorld, table: DataTable) {
    await this.cartPage.expectProductsFromTable(table.hashes());
});