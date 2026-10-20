import { DataTable, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

When('I click Proceed To Checkout', async function (this: CustomWorld) {
    await this.checkoutPage.clickProceedToCheckout();
});

Then('the address details are displayed', async function (this: CustomWorld) {
    await this.checkoutPage.expectAddressVisible();
});

Then('the order review is displayed', async function (this: CustomWorld) {
    await this.checkoutPage.expectOrderReviewVisible();
});

When('I enter the order comment:', async function (this: CustomWorld, table: DataTable) {
    const commentData = table.rowsHash();
    await this.checkoutPage.enterComment(commentData['Comment']);
});

When('I click Place Order', async function (this: CustomWorld) {
    await this.checkoutPage.clickPlaceOrder();
});

When('I enter the name on the card', async function (this: CustomWorld) {
    await this.checkoutPage.enterNameOnCard();
});

When('I enter the card number', async function (this: CustomWorld) {
    await this.checkoutPage.enterCardNumber();
});

When('I enter the CVC', async function (this: CustomWorld) {
    await this.checkoutPage.enterCVC();
});

When('I enter the expiration month', async function (this: CustomWorld) {
    await this.checkoutPage.enterExpirationMonth();
});

When('I enter the expiration year', async function (this: CustomWorld) {
    await this.checkoutPage.enterExpirationYear();
});

When('I click Pay and Confirm Order', async function (this: CustomWorld) {
    await this.checkoutPage.clickPayAndConfirmOrder();
});

Then('the order success message is displayed', async function (this: CustomWorld) {
    await this.checkoutPage.expectSuccessMessage();
});

Then('the delivery address matches the registration details', async function (this: CustomWorld) {
    await this.checkoutPage.expectDeliveryAddressMatchesRegistration();
});

Then('the billing address matches the registration details', async function (this: CustomWorld) {
    await this.checkoutPage.expectBillingAddressMatchesRegistration();
});
When('I enter payment details:', async function (this: CustomWorld, table: DataTable) {
    await this.checkoutPage.enterPaymentDetails(table.rowsHash());
});

Then('delivery and billing addresses match these details:', async function (this: CustomWorld, table: DataTable) {
    await this.checkoutPage.expectAddressesMatchRegistration(table.rowsHash());
});