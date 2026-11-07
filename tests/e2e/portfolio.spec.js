import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('navigation, project filtering, modal, and terminal smoke flow', async ({ page }) => {
  test.setTimeout(90000);
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  await page.goto('/');
  await expect(page.locator('#hero')).toBeVisible();

  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects/);
  await expect(page.getByRole('heading', { name: 'Ideas are better when they leave the notebook.' })).toBeVisible();

  await page.getByRole('tab', { name: /Client Platforms/ }).click();
  await expect(page.getByRole('tab', { name: /Client Platforms/ })).toBeVisible();

  const firstProject = page.locator('.refined-project-card').first();
  await firstProject.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();

  await page.getByRole('button', { name: /Terminal: open interactive developer terminal/ }).click();
  await expect(page.getByRole('dialog', { name: /interactive-cli/ })).toBeVisible();
  await page.getByPlaceholder(/Type a command/).fill('help');
  await page.getByPlaceholder(/Type a command/).press('Enter');
  await expect(page.locator('.terminal-output')).toContainText('Available commands');
  await page.getByRole('button', { name: 'projects', exact: true }).click();
  await expect(page.locator('.terminal-output')).toContainText('College Attendance Tracker');
  await page.getByRole('button', { name: 'theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'clear' }).click({ force: true });
  await expect(page.locator('.terminal-output')).toContainText('Terminal cleared');
  expect(browserErrors).toEqual([]);
});

test('responsive navigation is usable at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.waitForTimeout(500);
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('home page has no automated axe violations', async ({ page }) => {
  await page.goto('/');
  const darkResults = await new AxeBuilder({ page }).analyze();
  expect(darkResults.violations.filter((violation) => violation.impact === 'critical')).toEqual([]);
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  const lightResults = await new AxeBuilder({ page }).analyze();
  expect(lightResults.violations.filter((violation) => violation.impact === 'critical')).toEqual([]);
});

test('does not introduce horizontal overflow at supported viewport widths', async ({ page }) => {
  for (const width of [320, 375, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth
    }));
    expect(dimensions.document, `document overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.body, `body overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test('light theme is complete across navigation, sections, modals, and terminal', async ({ page }) => {
  test.setTimeout(90000);
  await page.goto('/');

  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  const sectionIds = {
    About: 'about',
    'Tech Stack': 'skills',
    Projects: 'projects',
    CodeCraft: 'agency',
    Journey: 'journey',
    Contact: 'contact'
  };
  for (const linkName of Object.keys(sectionIds)) {
    await page.getByRole('link', { name: linkName, exact: true }).click();
    await expect(page.locator(`#${sectionIds[linkName]}`)).toBeVisible();
  }

  const themeSnapshot = await page.evaluate(() => {
    const body = getComputedStyle(document.body);
    const card = getComputedStyle(document.querySelector('.refined-project-card'));
    const workbench = getComputedStyle(document.querySelector('.hero-workbench'));
    return {
      bodyBackground: body.backgroundColor,
      bodyColor: body.color,
      cardBackground: card.backgroundImage,
      workbenchBackground: workbench.backgroundImage,
      themeColor: document.querySelector('meta[name="theme-color"]')?.content
    };
  });
  expect(themeSnapshot.bodyColor).not.toBe('rgb(148, 163, 184)');
  expect(themeSnapshot.workbenchBackground).toContain('linear-gradient');
  expect(themeSnapshot.themeColor).toBe('#f3eee6');

  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await page.locator('.refined-project-card').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.locator('#heroStoryTrigger').click();
  await expect(page.locator('#storyModalOverlay')).toBeVisible();
  await page.getByRole('button', { name: 'Close Story' }).click({ force: true });

  await page.getByRole('button', { name: /Terminal: open interactive developer terminal/ }).click();
  await expect(page.getByRole('dialog', { name: /interactive-cli/ })).toBeVisible();
  const terminalBackground = await page.locator('.terminal-window').evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(terminalBackground).not.toBe('rgb(8, 11, 16)');
  await page.getByRole('button', { name: 'Close Terminal', exact: true }).click();

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('motion reveals activate on scroll and respect reduced motion', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/js-enabled/);
  await expect(page.locator('.hero-name')).toBeVisible();

  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('#projects .section-header')).toHaveClass(/active/);
  await expect(page.locator('.refined-project-card').first()).toHaveClass(/active/);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/motion-reduced/);
  const reducedMotionState = await page.locator('#projects .section-header').evaluate((element) => {
    const styles = getComputedStyle(element);
    return { opacity: styles.opacity, transform: styles.transform, transition: styles.transitionDuration };
  });
  expect(reducedMotionState.opacity).toBe('1');
  expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(reducedMotionState.transform);
  expect(parseFloat(reducedMotionState.transition)).toBeLessThanOrEqual(0.0001);
});
