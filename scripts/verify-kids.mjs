import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function testKids() {
  console.log('Launching browser to verify kids.html...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err.message);
  });

  await page.goto('http://localhost:5173/kids.html', { waitUntil: 'networkidle' });
  console.log('Page loaded. Waiting for 3D toy model to load and render...');
  await page.waitForTimeout(4000);

  const screenshotPath = path.join(rootDir, 'screenshots', 'kids-live-check.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  console.log('Console logs:');
  consoleLogs.slice(-10).forEach(l => console.log(l));

  await browser.close();
  console.log('Verification completed successfully.');
}

testKids().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
