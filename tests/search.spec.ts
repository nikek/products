import { test, expect } from "@playwright/test";

test.describe("Search functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should show all devices initially", async ({ page }) => {
    const deviceCount = await page.locator("small").textContent();
    expect(deviceCount).toContain("devices");
    expect(parseInt(deviceCount!)).toBeGreaterThan(0);
  });

  test("should filter devices as user types", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search");
    await searchInput.fill("switch");

    // Wait for the filter to be applied
    await page.waitForTimeout(300);

    // Check that results are filtered
    const deviceCount = await page.locator("small").textContent();
    expect(deviceCount).toContain("devices");

    // Verify all visible devices contain "switch" in their name
    const deviceNames = await page.locator("h1").allTextContents();
    deviceNames.forEach((name) => {
      expect(name.toLowerCase()).toContain("switch");
    });
  });
});
