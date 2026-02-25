const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('PAGE ERROR LOG:', msg.text());
        } else {
            console.log('PAGE LOG:', msg.text());
        }
    });

    page.on('pageerror', error => console.error('PAGE ERROR EXCEPTION:', error.message));
    page.on('requestfailed', request => {
        console.error('REQUEST FAILED:', request.url(), request.failure()?.errorText);
    });

    await page.goto('https://agency-vaynxmisamisa.vercel.app', { waitUntil: 'networkidle0' }).catch(e => console.error(e));

    await browser.close();
})();
