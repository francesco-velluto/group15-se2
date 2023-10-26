const dayjs = require("dayjs");
const { Builder, By, until } = require("selenium-webdriver");

beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
});

describe("Test page to select service", () => {
  test("Should retrieve service cards", async () => {
    await driver.get("http://localhost:3000");
    await driver.manage().setTimeouts({ implicit: 5000 });

    const cards = await driver.findElements(By.id("service-card"));
    const cardTitles = await driver.findElements(By.className("card-title"));
    
    expect(cards).not.toBeNull();
    expect(cards.length).toBeGreaterThan(0);
    expect(cardTitles).not.toBeNull();
    expect(cardTitles.length).toBeGreaterThan(0);
  });

  test("Should redirect to the ticket page when a service card is clicked", async () => {
    await driver.get("http://localhost:3000");

    const cards = await driver.findElements(By.id("service-card"));
    const cardTitles = await driver.findElements(By.className("card-title"));

    const serviceRequested = "Service: " + await cardTitles[0].getText(); // tag name of the requested service
    const requestDate = dayjs();
    await cards[0].click();

    await driver.wait(until.urlMatches(new RegExp(`^http:\/\/localhost:3000\/tickets\/[0-9]+`)), 10000);

    const currentUrl = await driver.getCurrentUrl();
    const urlbase = "http://localhost:3000/tickets/";
    
    const ticketNumberParam = currentUrl.slice(urlbase.length);
    const ticketNumberPage = await driver.findElement(By.id("ticket-number")).getText();
    
    // check that the ticket number in the url matches the ticket number in the page
    expect(ticketNumberPage).toEqual(ticketNumberParam);

    const serviceObtained = await driver.findElement(By.id("service-tag")).getText();
    expect(serviceObtained).toEqual(serviceRequested);

    const ticketTimestamp = await driver.findElement(By.id("ticket-date")).getText();
    const ticketDate = ticketTimestamp.slice("Date: ".length, "Date: dd-mm-yyyy".length);

    expect(ticketDate).toEqual(requestDate.format("DD/MM/YYYY"));
  });
});

afterAll(async () => {
  await driver.quit();
});
