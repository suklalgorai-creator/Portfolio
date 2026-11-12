import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('C:/Users/Suklal Gorai/.gemini/antigravity/brain/413e9591-3bed-4138-8202-2db0e3647e09/phase8-audit');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const routes = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'tech-stack', path: '/tech-stack' },
  { name: 'projects', path: '/projects' },
  { name: 'journey', path: '/journey' },
  { name: 'experience', path: '/experience' },
  { name: 'contact', path: '/contact' },
  { name: 'admin', path: '/admin' }
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];

async function run() {
  const browser = await chromium.launch();
  
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    for (const route of routes) {
      try {
        await page.goto(`http://127.0.0.1:4173${route.path}`, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(600);
        const file = path.join(outDir, `audit-${route.name}-${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`Saved: ${file}`);
      } catch (err) {
        console.error(`Failed ${route.name} (${vp.name}):`, err.message);
      }
    }
    await context.close();
  }

  await browser.close();
  console.log('Audit screenshots capture complete.');
}

run();
