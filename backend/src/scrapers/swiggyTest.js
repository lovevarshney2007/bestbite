import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

chromium.use(
    StealthPlugin()
);

const swiggyTest = async (job) => {

    // -------------------------
    // Launch Browser
    // -------------------------

    const context =
        await chromium.launchPersistentContext(
            "./browser-data",
            {
                headless: false,
                slowMo: 100,

                args: [
                    "--disable-blink-features=AutomationControlled"
                ],

                userAgent:
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",

                viewport: {
                    width: 1366,
                    height: 768
                }
            }
        );

    // -------------------------
    // Reuse Tab
    // -------------------------

    let page =
        context.pages()[0];

    if (!page) {
        page =
            await context.newPage();
    }

    // -------------------------
    // Open Swiggy
    // -------------------------

    if (
        !page.url().includes(
            "swiggy.com"
        )
    ) {

        await page.goto(
            "https://www.swiggy.com",
            {
                waitUntil: "domcontentloaded",
                timeout: 60000
            }
        );
    }

    await page.waitForTimeout(
        4000
    );

    // -------------------------
    // Job Data
    // -------------------------

    const city =
        job?.data?.city
        || "Delhi";

    const searchQuery =
        job?.data?.search
        || "Burger King";

    // -------------------------
    // Location Handling
    // -------------------------

    const locationInput =
        page.locator(
            'input[placeholder="Enter your delivery location"]'
        );

    const locationExists =
        await locationInput
            .isVisible()
            .catch(() => false);

    if (locationExists) {

        await locationInput.click();

        await locationInput.fill("");

        await locationInput.type(
            city,
            {
                delay: 120
            }
        );

        console.log(
            "[LOCATION TYPED]",
            city
        );

        await page.waitForTimeout(
            3000
        );

        await page
            .locator(
                'div[role="button"]'
            )
            .first()
            .click();

        console.log(
            "[LOCATION SELECTED]"
        );

        await page.waitForLoadState(
            "domcontentloaded"
        );

    } else {

        console.log(
            "[LOCATION ALREADY SET]"
        );
    }

    // -------------------------
    // Search Box
    // -------------------------

    let searchBox =
        page.locator(
            '[data-testid="search-bar"] input[type="text"]'
        ).first();

    if (
        await searchBox.count() === 0
    ) {

        searchBox =
            page.locator(
                'input[placeholder*="restaurant"]'
            ).first();
    }

    if (
        await searchBox.count() === 0
    ) {

        searchBox =
            page.locator(
                'input[type="text"]'
            ).first();
    }

    await searchBox.waitFor({
        state: "visible",
        timeout: 30000
    });

    await searchBox.click();

    await searchBox.fill("");

    await searchBox.type(
        searchQuery,
        {
            delay: 120
        }
    );

    console.log(
        "[SEARCH TYPED]",
        searchQuery
    );

    await page.waitForTimeout(
        5000
    );

    console.log(
        "[SEARCH WAIT DONE]"
    );

    // -------------------------
    // Restaurant Cards
    // -------------------------

    await page.waitForSelector(
        '[data-testid="search-pl-restaurant-card"]',
        {
            timeout: 30000
        }
    );

    const restaurantCards =
        page.locator(
            '[data-testid="search-pl-restaurant-card"]'
        );

    const count =
        await restaurantCards.count();

    console.log(
        "[RESTAURANTS FOUND]",
        count
    );

    if (count === 0) {

        throw new Error(
            "No restaurants found"
        );
    }

    const restaurants =
        await page.$$eval(
            '[data-testid="search-pl-restaurant-card"]',
            cards => {

                return cards.map(card => {

                    const anchor =
                        card.querySelector(
                            'a[data-testid="restaurant-card-anchor-container"]'
                        );

                    return {
                        aria:
                            anchor?.getAttribute(
                                "aria-label"
                            ) || "",

                        link:
                            anchor?.getAttribute(
                                "href"
                            ) || ""
                    };
                });
            }
        );

    console.log(
        "[RESTAURANTS]",
        restaurants
    );

    // -------------------------
    // Auto Click First Restaurant
    // -------------------------

    const firstRestaurant =
        restaurantCards.first();

    const restaurantName =
        await firstRestaurant
            .locator(
                'a[data-testid="restaurant-card-anchor-container"]'
            )
            .getAttribute(
                "aria-label"
            );

    console.log(
        "[AUTO CLICK]",
        restaurantName
    );

    await firstRestaurant.click();

    await page.waitForLoadState(
        "domcontentloaded"
    );

    await page.waitForTimeout(
        5000
    );

    console.log(
        "[RESTAURANT OPENED]"
    );

    // -------------------------
    // Screenshot
    // -------------------------

    await page.screenshot({
        path: "swiggy-search.png"
    });

    // -------------------------
    // Logs
    // -------------------------

    const title =
        await page.title();

    const bodyText =
        await page
            .locator(
                "body"
            )
            .textContent();

    const url =
        page.url();

    console.log(
        "[CURRENT URL]",
        url
    );

    console.log(
        "[TITLE]",
        title
    );

    console.log(
        "[BODY SAMPLE]",
        bodyText?.slice(0, 300)
    );

    return {
        title,
        url,
        restaurants
    };
};

export default swiggyTest;