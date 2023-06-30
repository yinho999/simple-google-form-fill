import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();

    await page.goto("https://docs.google.com/forms/d/e/1FAIpQLSe-UkL6I5hPfD2AyKRrmIZy9Jd9et29nqeQZYOvyhdPKYdNXw/viewform");

    const insert_result = ['English', 'Idk what is vacation']
    const form = await page.$('form');
    if (!form) {
        throw new Error('form not found');
    }
    const inputs = await form.$$('input[type=text]');
    if (!inputs) {
        throw new Error('inputs not found');
    }
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        await input.type(insert_result[i], { delay: 100 });
    }

    // Submit
    const submit_button = await form.$('div[role=button]');
    if (!submit_button) {
        throw new Error('submit_button not found');
    }
    await submit_button.click();
    // Close the browser
    await browser.close();
})();
