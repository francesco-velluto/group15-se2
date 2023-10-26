const { Builder, By, until } = require("selenium-webdriver");

beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
});

describe("Test page to select service", () => {
  test("Should retrieve service cards", async () => {
    await driver.get("http://localhost:3000");
    await driver.manage().setTimeouts({ implicit: 5000 });

    const cards = await driver.findElements(By.id("service-card"));
    expect(cards).not.toBeNull();
    expect(cards.length).toBeGreaterThan(0);
  });

  test("Should redirect to the ticket page when a service card is clicked", async () => {
    await driver.get("http://localhost:3000");
    // await driver.manage().setTimeouts({ implicit: 5000 });

    const cards = await driver.findElements(By.id("service-card"));
    await cards[0].click();

    await driver.wait(until.urlMatches(new RegExp(`^http:\/\/localhost:3000\/tickets\/[0-9]+`)), 10000);

    const currentUrl = await driver.getCurrentUrl();
    //expect(currentUrl).not.toEqual("http://localhost:3000/");
    console.log(currentUrl);
  });
});

afterAll(async () => {
  await driver.quit();
});
