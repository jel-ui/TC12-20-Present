import { World, setWorldConstructor } from '@cucumber/cucumber';
import type { BrowserContext, Page } from '@playwright/test';
import { AccountPage } from '../pages/AccountPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

export class CustomWorld extends World {
    context!: BrowserContext;
    page!: Page;
    homePage!: HomePage;
    productsPage!: ProductsPage;
    cartPage!: CartPage;
    accountPage!: AccountPage;
    checkoutPage!: CheckoutPage;
    signupName = '';
    signupEmail = '';
    searchWord = '';
    expectedSearchText = '';
    existingUsername = '';
    searchedProductNames: string[] = [];

    initializePages(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
        this.accountPage = new AccountPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }
}

setWorldConstructor(CustomWorld);
