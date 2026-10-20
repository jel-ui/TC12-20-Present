import { DataTable, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Then('the ALL PRODUCTS heading is visible', async function (this: CustomWorld) {
    await this.productsPage.expectAllProductsHeadingVisible();
});

When('I search using this data:', async function (this: CustomWorld, table: DataTable) {
    const searchData = table.hashes()[0];
    this.searchWord = searchData['Search term'];
    this.expectedSearchText = searchData['Expected text in each result'];
    await this.productsPage.searchForProduct(this.searchWord);
});

Then('the SEARCHED PRODUCTS heading is visible', async function (this: CustomWorld) {
    await this.productsPage.expectSearchedProductsHeadingVisible();
});

Then('every result contains the expected text', async function (this: CustomWorld) {
    this.searchedProductNames = await this.productsPage.getSearchResultNames(this.expectedSearchText);
});

When('I add all search results to the cart', async function (this: CustomWorld) {
    await this.productsPage.addAllSearchResultsToCart();
});

Then('all searched products are visible in the cart', async function (this: CustomWorld) {
    await this.cartPage.expectProductsVisible(this.searchedProductNames);
});