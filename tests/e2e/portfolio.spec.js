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
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole('heading', { name: 'Something New Is Taking Shape.' })).toBeVisible();
  await expect(page.getByText(/I'm preparing a collection of projects that reflect my work, experiments and ideas/i)).toBeVisible();

  await page.getByRole('button', { name: /Terminal: open interactive developer terminal/ }).click();
  await expect(page.getByRole('dialog', { name: /interactive-cli/ })).toBeVisible();
  await page.getByPlaceholder(/Type a command/).fill('help');
  await page.getByPlaceholder(/Type a command/).press('Enter');
  await expect(page.locator('.terminal-output')).toContainText('Available commands');
  await page.getByRole('button', { name: 'projects', exact: true }).click();
  await expect(page.locator('.terminal-output')).toContainText('College Attendance Tracker');
  await page.getByRole('button', { name: 'theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
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
  await page.waitForTimeout(400);
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('home page and journey page have no automated axe critical or serious violations', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(650);
  const lightResults = await new AxeBuilder({ page }).analyze();
  expect(
    lightResults.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious')
  ).toEqual([]);

  await page.goto('/journey');
  await page.waitForTimeout(650);
  const journeyResults = await new AxeBuilder({ page }).analyze();
  expect(
    journeyResults.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious')
  ).toEqual([]);
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

test('apple liquid glass light identity is default across all routes', async ({ page }) => {
  test.setTimeout(90000);
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  const snapshot = await page.evaluate(() => {
    const body = getComputedStyle(document.body);
    return {
      bodyBackground: body.backgroundColor,
      bodyColor: body.color,
      themeColor: document.querySelector('meta[name="theme-color"]')?.content
    };
  });

  expect(snapshot.bodyBackground).toBe('rgb(247, 248, 255)');
  expect(snapshot.themeColor).toBe('#F7F8FF');

  for (const route of ['/about', '/journey', '/tech-stack', '/projects', '/experience', '/studio', '/contact']) {
    await page.goto(route);
    await expect(page).toHaveURL(new RegExp(`${route.replace('/', '\\/')}$`));
    await expect(page.locator('#main-content')).toBeVisible();
  }
});

test('journey CMS publishes updates from admin dashboard to public timeline', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByRole('heading', { name: /Admin Dashboard Sign In/i })).toBeVisible();

  await page.getByLabel('Admin Passcode').fill('studio2026');
  await page.getByRole('button', { name: /Unlock CMS Dashboard/i }).click();
  await expect(page.getByRole('heading', { name: /Journey & Achievements Studio/i })).toBeVisible();

  await page.getByLabel('Title').fill('Jamshedpur Hackathon Finalist 2026');
  await page.getByLabel('Category', { exact: true }).selectOption('Competitions');
  await page.getByLabel('Display Date').fill('Nov 2026');
  await page.getByLabel('Organization / Platform').fill('NSU Tech Fest');
  await page.getByLabel('Story / Achievement Details').fill('Built an offline-first student campus assistant prototype in 24 hours.');
  await page.getByRole('button', { name: /Publish to Public Timeline/i }).click();

  await page.getByRole('link', { name: /View Public Timeline/i }).click();
  await expect(page).toHaveURL(/\/journey$/);
  await expect(page.locator('#journey')).toContainText('Jamshedpur Hackathon Finalist 2026');
});

test('dedicated portfolio routes render directly and unknown paths show the 404 page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/projects$/);

  for (const route of ['/about', '/journey', '/projects', '/tech-stack', '/experience', '/studio', '/contact']) {
    await page.goto(route);
    await expect(page.locator('#main-content')).toBeVisible();
    await expect(page.locator('.page-intro')).toBeVisible();
    await expect(page).toHaveTitle(/Suklal Gorai|Curious Minds Studio/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
  }

  await page.goto('/projects/attendance-tracker');
  await expect(page.locator('#main-content')).toBeVisible();
  await expect(page.getByRole('heading', { name: /College Attendance Tracker/i })).toBeVisible();
  await expect(page).toHaveTitle(/College Attendance Tracker/);

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
  await expect(page.locator('#projects .home-projects-teaser')).toHaveClass(/active/);
  await expect(page.locator('#projects')).toContainText('Something New Is Taking Shape.');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/motion-reduced/);
  const reducedMotionState = await page.locator('#projects .home-projects-teaser').evaluate((element) => {
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

  const metadata = await page.waitForFunction(() => {
    const element = document.querySelector('#cinematic-story video');
    return element
      && element.readyState >= 1
      && Number.isFinite(element.duration)
      && element.duration > 0
      ? { duration: element.duration, currentTime: element.currentTime }
      : null;
  }, { timeout: 20000 });

  const initial = await metadata.jsonValue();
  expect(initial.duration).toBeGreaterThan(0);

  const startY = await page.evaluate(() => {
    const section = document.querySelector('#cinematic-story');
    return section.getBoundingClientRect().top + window.scrollY;
  });

  await page.evaluate((y) => window.scrollTo(0, y), startY + 1);
  const beforeForward = await video.evaluate((element) => element.currentTime);
  const forwardY = startY + Math.min(page.viewportSize().height * 1.25, 1100);
  await page.evaluate((y) => window.scrollTo(0, y), forwardY);

  const forward = await page.waitForFunction((before) => {
    const element = document.querySelector('#cinematic-story video');
    return element && element.currentTime > before + 0.05
      ? { currentTime: element.currentTime, duration: element.duration }
      : null;
  }, beforeForward, { timeout: 15000 });

  const forwardState = await forward.jsonValue();
  expect(forwardState.currentTime).toBeGreaterThan(beforeForward + 0.05);

  const backwardY = startY + 120;
  await page.evaluate((y) => window.scrollTo(0, y), backwardY);

  const backward = await page.waitForFunction((before) => {
    const element = document.querySelector('#cinematic-story video');
    return element && element.currentTime < before - 0.05
      ? { currentTime: element.currentTime, duration: element.duration }
      : null;
  }, forwardState.currentTime, { timeout: 15000 });

  const backwardState = await backward.jsonValue();
  expect(backwardState.currentTime).toBeLessThan(forwardState.currentTime - 0.05);
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

  const powerTitle = page.locator('#tech-power-title');
  await expect(powerTitle).toBeVisible();
  await expect(powerTitle).toContainText('Technologies That');
  await expect(powerTitle).toContainText('Power Me');

  const characterImg = page.locator('.power-silhouette-img');
  await expect(characterImg).toBeVisible();

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

  const activateBtn = page.getByRole('button', { name: /activate power mode/i });
  await expect(activateBtn).toBeVisible();
  await activateBtn.click();

  await expect(page.locator('.power-status-indicator')).toBeVisible();

  const reactCard = page.locator('.tech-power-card[data-tech="react"]');
  await reactCard.hover();
  await page.waitForTimeout(300);

  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
  expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport);

  expect(browserErrors).toEqual([]);
});
