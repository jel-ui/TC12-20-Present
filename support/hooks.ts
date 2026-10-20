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
    this.context = await browser.newContext({
        viewport: { width: 1366, height: 768 }
    });
    await this.context.route(
        /doubleclick\.net|googlesyndication\.com|googletagservices\.com|googleads/i,
        route => route.abort()
    );
    await this.context.addInitScript(() => {
        const highlightAttribute = 'data-playwright-last-action';
        const styleId = 'playwright-action-highlight-style';

        const addHighlightStyle = () => {
            if (document.getElementById(styleId)) return;

            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                [${highlightAttribute}="true"] {
                    outline: 3px solid #ff3b30 !important;
                    outline-offset: 3px !important;
                    box-shadow: 0 0 0 5px rgba(255, 59, 48, 0.20) !important;
                }
            `;
            (document.head || document.documentElement).appendChild(style);
        };

        const highlightLastAction = (target: EventTarget | null) => {
            if (!(target instanceof Element)) return;

            const actionElement = target.closest(
                `button, a, input, textarea, select, [role="button"], [role="link"], [tabindex], .product-image-wrapper`
            );
            if (!actionElement) return;

            document.querySelectorAll(`[${highlightAttribute}="true"]`).forEach(element => {
                element.removeAttribute(highlightAttribute);
            });
            actionElement.setAttribute(highlightAttribute, 'true');
            addHighlightStyle();
        };

        document.addEventListener('pointerdown', event => highlightLastAction(event.target), true);
        document.addEventListener('pointerover', event => highlightLastAction(event.target), true);
        document.addEventListener('focusin', event => highlightLastAction(event.target), true);
        document.addEventListener('input', event => highlightLastAction(event.target), true);
        document.addEventListener('change', event => highlightLastAction(event.target), true);
        addHighlightStyle();
    });
    const page = await this.context.newPage();
    page.setDefaultTimeout(60_000);
    page.setDefaultNavigationTimeout(90_000);
    this.initializePages(page);
});

// Chụp ảnh sau mỗi step để theo dõi trạng thái trang trong Cucumber report.
AfterStep(async function (this: CustomWorld) {
    if (!this.page || this.page.isClosed()) return;

    try {
        // Chờ giao diện cập nhật xong để ảnh sau mỗi step dễ quan sát hơn khi demo.
        await this.page.waitForTimeout(1_000);
        const screenshot = await this.page.screenshot({
            fullPage: false,
            scale: 'css'
        });
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
