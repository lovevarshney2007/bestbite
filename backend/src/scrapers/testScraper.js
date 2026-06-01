import { chromium }
from "playwright";

const testScraper =
async()=>{

    const browser =
        await chromium.launch({
            headless:true
        });

    const page =
        await browser.newPage();

    await page.goto(
        "https://example.com"
    );

    const title =
        await page.title();

    const heading =
        await page.locator(
            "h1"
        ).textContent();

    const paragraph =
        await page.locator(
            "p"
        ).first().textContent();

    console.log(
        "[TITLE]",
        title
    );

    console.log(
        "[H1]",
        heading
    );

    console.log(
        "[P]",
        paragraph
    );

    await browser.close();

    return {
        title,
        heading,
        paragraph
    };
};

export default testScraper;