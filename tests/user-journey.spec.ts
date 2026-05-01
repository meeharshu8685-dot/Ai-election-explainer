import { test, expect } from '@playwright/test';

test.describe('Election Copilot User Journey', () => {
  test('User can navigate to Scenarios, select a scenario, and get guidance', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');

    // Verify Home Page loads
    await expect(page.locator('h1')).toContainText('Understand Elections');

    // Click on Scenarios in Navbar
    await page.click('nav button:has-text("Scenarios")');

    // Verify Scenarios Page loads
    await expect(page.locator('h2')).toContainText('Your situation, step-by-step.');

    // Click on "I turned 18 recently" scenario's "Get full guidance" button
    // It's the button inside the card with that title
    const scenarioCard = page.locator('.card', { hasText: 'I turned 18 recently' });
    await scenarioCard.locator('button', { hasText: 'Get full guidance' }).click();

    // Verify we are navigated to the Chat view (implicitly, by checking if the chat input is visible)
    await expect(page.locator('input[placeholder="Ask anything about elections..."]')).toBeVisible();

    // Verify the AI has responded with the detailed guidance
    await expect(page.locator('.chat-bubble-ai').last()).toContainText('Congratulations on turning 18');
  });

  test('User can navigate to Compare and see institutions side-by-side', async ({ page }) => {
    await page.goto('/');
    
    // Click on Compare Institutions from Home Hero
    await page.click('button:has-text("Compare Institutions")');

    // Verify we are on Compare view
    await expect(page.locator('h2')).toContainText('Side-by-side comparisons');

    // Verify "Lok Sabha vs Rajya Sabha" button exists and is pressed (active by default)
    const lsrsBtn = page.locator('button', { hasText: 'Lok Sabha vs Rajya Sabha' });
    await expect(lsrsBtn).toBeVisible();

    // Verify content of comparison is visible
    await expect(page.locator('#comparison-details')).toContainText('543 directly elected seats');
  });
});
