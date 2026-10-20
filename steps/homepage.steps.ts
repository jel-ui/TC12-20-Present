import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

When('I scroll down to the bottom of the page', async function (this: CustomWorld) {
    await this.homePage.scrollToBottom();
});

Then('the SUBSCRIPTION section is visible', async function (this: CustomWorld) {
    await this.homePage.expectSubscriptionVisible();
});

When('I click the scroll-up arrow', async function (this: CustomWorld) {
    await this.homePage.clickScrollUpArrow();
});

Then('the homepage heading is visible at the top', async function (this: CustomWorld) {
    await this.homePage.expectHomepageHeadingVisibleAtTop();
});