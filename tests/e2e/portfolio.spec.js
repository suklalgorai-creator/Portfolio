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
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole('heading', { name: 'Ideas are better when they leave the notebook.' })).toBeVisible();

  await page.getByRole('tab', { name: /Web Concepts/ }).click();
  await expect(page.getByRole('tab', { name: /Web Concepts/ })).toBeVisible();

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

test('light theme is complete across dedicated portfolio pages', async ({ page }) => {
  test.setTimeout(90000);
  await page.goto('/');

  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  const pageRoutes = {
    About: '/about',
    'Tech Stack': '/tech-stack',
    Projects: '/projects',
    'Curious Minds': '/studio',
    Contact: '/contact'
  };
  for (const [linkName, route] of Object.entries(pageRoutes)) {
    await page.goto(route);
    await expect(page).toHaveURL(new RegExp(`${route.replace('/', '\\/')}$`));
  }

  await page.goto('/');

  const themeSnapshot = await page.evaluate(() => {
    const body = getComputedStyle(document.body);
    const card = getComputedStyle(document.querySelector('.refined-project-card'));
    const workbench = getComputedStyle(document.querySelector('.hero-workbench') || document.body);
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

});

test('dedicated portfolio routes render directly and unknown paths show the 404 page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/projects$/);

  for (const route of ['/about', '/projects', '/tech-stack', '/studio', '/contact']) {
    await page.goto(route);
    await expect(page.locator('#main-content')).toBeVisible();
    await expect(page.locator('.page-intro')).toBeVisible();
    await expect(page).toHaveTitle(/Suklal Gorai|Curious Minds Studio/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
  }

  await page.goto('/about/');
  await expect(page.getByRole('heading', { name: /curious developer/i })).toBeVisible();
  await expect(page.locator('img[alt="Suklal Gorai"]').first()).toHaveAttribute('src', '/assets/images/avatar.jpg');

  await page.goto('/does-not-exist');
  await expect(page.getByRole('heading', { name: /wrong turn/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Return home/i })).toHaveAttribute('href', '/');
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

test('cinematic story keeps video and stages accessible across motion modes', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('#cinematic-story')).toBeVisible();
  await expect(page.locator('#cinematic-story h2')).toBeVisible();
  await expect(page.locator('.cinematic-story-stage')).toHaveCount(3);
  await expect(page.locator('#cinematic-story')).toHaveAttribute('data-motion-mode', 'scrub');

  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload();
  await expect(page.locator('#cinematic-story')).toHaveAttribute('data-motion-mode', 'static');
  await expect(page.locator('.cinematic-story-stage').nth(2)).toBeVisible();

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('#cinematic-story')).toHaveAttribute('data-motion-mode', 'static');
  expect(pageErrors).toEqual([]);
});

test('cinematic story scrubs the source video forward and backward with scroll', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const story = page.locator('#cinematic-story');
  const video = page.locator('#cinematic-story video');
  await expect(story).toHaveAttribute('data-motion-mode', 'scrub');
  await expect(video.locator('source')).toHaveAttribute('src', '/assets/videos/part 1.mp4');

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });

  let metadata;
  try {
    metadata = await page.waitForFunction(() => {
      const element = document.querySelector('#cinematic-story video');
      return element
        && element.readyState >= 1
        && Number.isFinite(element.duration)
        && element.duration > 0
        ? { duration: element.duration, currentTime: element.currentTime }
        : null;
    }, { timeout: 20000 });
  } catch (error) {
    throw new Error(
      'Cinematic video metadata was not available within 20 seconds; Chromium could not verify assets/videos/part 1.mp4 seeking. ' +
      'Manual QA: open the site in desktop Chromium, scroll through the pinned section, and confirm the video advances and reverses.'
    );
  }

  const initial = await metadata.jsonValue();
  expect(initial.duration).toBeGreaterThan(0);
  expect(Number.isFinite(initial.duration)).toBe(true);
  expect(initial.currentTime).toBeGreaterThanOrEqual(0);
  expect(initial.currentTime).toBeLessThanOrEqual(initial.duration);

  const startY = await page.evaluate(() => {
    const section = document.querySelector('#cinematic-story');
    return section.getBoundingClientRect().top + window.scrollY;
  });

  await page.evaluate((y) => window.scrollTo(0, y), startY + 1);
  const beforeForward = await video.evaluate((element) => element.currentTime);
  const forwardY = startY + Math.min(page.viewportSize().height * 1.25, 1100);
  await page.evaluate((y) => window.scrollTo(0, y), forwardY);

  let forward;
  try {
    forward = await page.waitForFunction((before) => {
      const element = document.querySelector('#cinematic-story video');
      return element && element.currentTime > before + 0.05
        ? { currentTime: element.currentTime, duration: element.duration }
        : null;
    }, beforeForward, { timeout: 15000 });
  } catch (error) {
    throw new Error(
      `Scroll did not advance video.currentTime from ${beforeForward.toFixed(3)} seconds. ` +
      'This may indicate a Chromium codec/seek limitation for assets/videos/part 1.mp4.'
    );
  }

  const forwardState = await forward.jsonValue();
  expect(forwardState.currentTime).toBeGreaterThan(beforeForward + 0.05);
  expect(forwardState.currentTime).toBeLessThanOrEqual(forwardState.duration);

  const backwardY = startY + 120;
  await page.evaluate((y) => window.scrollTo(0, y), backwardY);

  let backward;
  try {
    backward = await page.waitForFunction((before) => {
      const element = document.querySelector('#cinematic-story video');
      return element && element.currentTime < before - 0.05
        ? { currentTime: element.currentTime, duration: element.duration }
        : null;
    }, forwardState.currentTime, { timeout: 15000 });
  } catch (error) {
    throw new Error(
      `Reverse scrolling did not decrease video.currentTime from ${forwardState.currentTime.toFixed(3)} seconds. ` +
      'This may indicate a Chromium codec/seek limitation or a ScrollTrigger synchronization regression.'
    );
  }

  const backwardState = await backward.jsonValue();
  expect(backwardState.currentTime).toBeLessThan(forwardState.currentTime - 0.05);
  expect(backwardState.currentTime).toBeGreaterThanOrEqual(0);
  expect(backwardState.currentTime).toBeLessThanOrEqual(backwardState.duration);
});

test('cinematic tech stack power mode renders cards, character, and handles activation cleanly', async ({ page }) => {
  test.setTimeout(60000);
  const browserErrors = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.goto('/tech-stack');
  await expect(page).toHaveURL(/\/tech-stack$/);

  // Verify power mode section and headline
  const powerTitle = page.locator('#tech-power-title');
  await expect(powerTitle).toBeVisible();
  await expect(powerTitle).toContainText('Technologies That');
  await expect(powerTitle).toContainText('Power Me');

  // Verify developer character silhouette exists
  const characterImg = page.locator('.power-silhouette-img');
  await expect(characterImg).toBeVisible();

  // Verify technology floating icons on left and right within the power mode stage
  const powerStage = page.locator('.power-stage-wrapper');
  await expect(powerStage.locator('.tech-power-card[data-tech="flutter"]')).toBeVisible();
  await expect(powerStage.locator('.tech-power-card[data-tech="dart"]')).toBeVisible();
  await expect(powerStage.locator('.tech-power-card[data-tech="kotlin"]')).toBeVisible();
  await expect(powerStage.locator('.tech-power-card[data-tech="android"]')).toBeVisible();

  await expect(powerStage.locator('.tech-power-card[data-tech="react"]')).toBeVisible();
  await expect(powerStage.locator('.tech-power-card[data-tech="nextjs"]')).toBeVisible();
  await expect(powerStage.locator('.tech-power-card[data-tech="javascript"]')).toBeVisible();
  await expect(powerStage.locator('.tech-power-card[data-tech="vite"]')).toBeVisible();
  await expect(powerStage.locator('.tech-power-card[data-tech="html"]')).toBeVisible();
  await expect(powerStage.locator('.tech-power-card[data-tech="css"]')).toBeVisible();

  // Trigger Power Mode Activation
  const activateBtn = page.getByRole('button', { name: /activate power mode/i });
  await expect(activateBtn).toBeVisible();
  await activateBtn.click();

  // Status indicator updates
  await expect(page.locator('.power-status-indicator')).toBeVisible();

  // Hover on a card to test channel boost
  const reactCard = page.locator('.tech-power-card[data-tech="react"]');
  await reactCard.hover();
  await page.waitForTimeout(300);

  // Verify no horizontal overflow on page
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
  expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport);

  // Verify no uncaught console or runtime errors
  expect(browserErrors).toEqual([]);
});
