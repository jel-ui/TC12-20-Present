import { expect, type Page } from '@playwright/test';

export class HomePage {
    constructor(private readonly page: Page) {}
    async open() {
        await this.page.goto('https://automationexercise.com'); 
    }
    
    async expectVisible() {
        await expect(
            this.page.locator('h1:visible').first())
        .toBeVisible(); 
    }

    async openProducts() {
        await this.page.getByRole('link', { name: /Products/ }).click(); 
    }

    async openSignupLogin() {
        await this.page.getByText('Signup / Login', { exact: true }).click(); 
    }

    async scrollToBottom() {
        await this.page.keyboard.press('End');
    }

    async expectSubscriptionVisible() {
        // TODO: Lấy locator của heading "SUBSCRIPTION" ở cuối trang (Inspect heading trong footer bằng DevTools).
        await expect(this.page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
    }

    async clickScrollUpArrow() {
        // TODO: Lấy locator của nút mũi tên lên ở góc dưới bên phải (Inspect nút sau khi cuộn xuống).
        await this.page.locator('#scrollUp').click();
    }

    async expectHomepageHeadingVisibleAtTop() {
        // TODO: Lấy locator của heading "Full-Fledged practice website for Automation Engineers" (Inspect heading trên đầu trang).
        await expect(this.page.locator('h2').filter({ hasText: 'Full-Fledged practice website for Automation Engineers' }).first()).toBeVisible();
    }
}

