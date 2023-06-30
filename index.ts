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
    //  "ชื่อ - สกุล"
    const input_1=await form.$('input[type=text]:nth-child(1)');
    if (!input_1) {
        throw new Error('input_1 not found');
    }
    await input_1.type('English', { delay: 100 });
    // "วันที่ต้องการจอง Vacation/Off"
    const input_2=await form.$('input[type=text]:nth-child(2)');
    if (!input_2) {
        throw new Error('input_2 not found');
    }
    await input_2.type('2021-10-10', { delay: 100 });

    // Submit
    const submit_button = await form.$('div[role=button]');
    if (!submit_button) {
        throw new Error('submit_button not found');
    }
    await submit_button.click();
    // Close the browser
    await browser.close();
})();
