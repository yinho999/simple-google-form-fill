import puppeteer from "puppeteer";

async function submitForm() {
    const browser = await puppeteer.launch();
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
        await input.type(insert_result[i], {delay: 100});
    }

    // Submit
    const submit_button = await form.$('div[role=button]');
    if (!submit_button) {
        throw new Error('submit_button not found');
    }
    await submit_button.click();
    // Close the browser
    await browser.close();
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const time = {
    year: 2023,
    month: 7,
    day: 9,
    hour: 8,
    minute: 0,
    second: 0
}

const loop = 4;


async function main() {
    // Get current utc datetime
    const now = new Date();
    const utc_datetime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    // Get thailand datetime
    const thailand_datetime = new Date(utc_datetime.getTime() + 7 * 60 * 60000);
    console.log(`Year ${thailand_datetime.getFullYear()}, Month ${thailand_datetime.getMonth() + 1}, Day ${thailand_datetime.getDate()}, Hour ${thailand_datetime.getHours()}, Minute ${thailand_datetime.getMinutes()}, Second ${thailand_datetime.getSeconds()}`)
    // Check if it is 8:00.00 AM
    if (thailand_datetime.getFullYear() !== time.year ||
        thailand_datetime.getMonth() !== time.month ||
        thailand_datetime.getDate() !== time.day ||
        thailand_datetime.getHours() !== time.hour ||
        thailand_datetime.getMinutes() !== time.minute ||
        thailand_datetime.getSeconds() !== time.second) {

        return;
    }
    for (let i = 0; i < loop; i++) {

        // await submitForm();
        await sleep(200);
    }

}

(async () => {
    while (true) {
        await main();
        await sleep(500);
    }
})();
