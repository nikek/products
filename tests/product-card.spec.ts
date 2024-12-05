import { test, expect } from "@playwright/test";

test.describe("ProductCard", () => {
  test("should navigate to product detail page when clicked", async ({
    page,
  }) => {
    // Navigate to the page containing ProductCards
    await page.goto("/?view=grid");

    // Click the first product card
    const firstCard = await page.locator("article").first();
    const cardLink = await firstCard.locator("a").getAttribute("href");
    await firstCard.click();

    // Verify navigation
    await expect(page).toHaveURL(cardLink!);
  });

  test("should maintain layout on different viewport sizes", async ({
    page,
  }) => {
    await page.goto("/?view=grid");

    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("article").first()).toBeVisible();

    // Test on tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator("article").first()).toBeVisible();

    // Test on desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator("article").first()).toBeVisible();
  });
});
