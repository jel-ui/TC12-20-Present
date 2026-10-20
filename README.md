# TC12–TC16: Automation Exercise

Bộ kiểm thử UI dùng Cucumber, Gherkin và Playwright.

## Cấu trúc

- features/cart.feature: TC12 và TC13.
- features/orders.feature: TC14, TC15 và TC16.
- steps/: step definitions dùng chung, gom trực tiếp tại đây.
- pages/: Page Objects cho từng trang.
- support/: Cucumber hooks và CustomWorld.
- test-results/: báo cáo HTML sau khi chạy.

## Chạy kiểm thử

    npm test

Chạy riêng từng testcase hoặc nhóm:

    npm run test:tc12
    npm run test:tc13
    npm run test:tc14
    npm run test:tc15
    npm run test:tc16
    npm run test:cart
    npm run test:orders

Mở báo cáo sau khi chạy:

    start .\test-results\cucumber-report.html
