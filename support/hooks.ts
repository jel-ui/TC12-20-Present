import { After, AfterAll, AfterStep, Before, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, type Browser } from '@playwright/test';
import { CustomWorld } from './world';

let browser: Browser | undefined;
setDefaultTimeout(120_000);

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function (this: CustomWorld) {
    if (!browser) throw new Error('Browser was not started in BeforeAll.');
    this.context = await browser.newContext();
    await this.context.route(
        /doubleclick\.net|googlesyndication\.com|googletagservices\.com|googleads/i,
        route => route.abort()
    );
    const page = await this.context.newPage();
    page.setDefaultTimeout(60_000);
    page.setDefaultNavigationTimeout(90_000);
    this.initializePages(page);
});

// Chụp ảnh sau mỗi step để theo dõi trạng thái trang trong Cucumber report.
AfterStep(async function (this: CustomWorld) {
    if (!this.page || this.page.isClosed()) return;

    try {
        const screenshot = await this.page.screenshot({ fullPage: true });
        this.attach(screenshot, 'image/png');
    } catch (error) {
        // Không để lỗi chụp ảnh che mất lỗi thực tế của step.
        console.warn('Could not capture screenshot after step:', error);
    }
});

After(async function (this: CustomWorld) {
    if (this.context) await this.context.close();
});

AfterAll(async function () {
    if (browser) {
        await browser.close();
        browser = undefined;
    }
});
