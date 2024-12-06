import { test, expect } from "@playwright/test";

test.describe("Filter functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?view=grid", { waitUntil: "commit" });
    await page.waitForFunction(
      () => !document.documentElement.classList.contains("no-js")
    );
  });

  test("should show filter popover when clicking filter button", async ({
    page,
  }) => {
    const filterButton = page.getByRole("button", { name: "Filter" });
    await filterButton.click();

    // Check if the popover is visible
    const filterPopover = page.getByRole("dialog");
    await expect(filterPopover).toBeVisible();

    // Verify filter options are present
    const filterOptions = page.locator("input[type='checkbox']");
    await expect(filterOptions).toHaveCount(await filterOptions.count());
  });

  test("should filter products when selecting a product line", async ({
    page,
  }) => {
    // Get initial product count
    const initialProducts = await page.locator("article").count();

    // Open filter
    const filterButton = await page.getByRole("button", { name: "Filter" });
    await filterButton.click();

    // Select first product line
    const firstCheckbox = page.locator("input[type='checkbox']").first();
    const productLineName = await page.locator("label").first().textContent();
    await firstCheckbox.check();

    // Verify checkbox is checked
    await expect(firstCheckbox).toBeChecked();

    // Get filtered product count
    const filteredProducts = await page.locator("article").count();

    // Verify product count changed
    expect(filteredProducts).toBeLessThan(initialProducts);

    // Verify all visible products belong to selected line
    const productLines = await page.locator(".label").allTextContents();
    productLines.forEach((line) => {
      expect(line).toBe(productLineName?.trim());
    });
  });
});
