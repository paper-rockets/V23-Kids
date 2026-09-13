import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function testPusheen() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:5173/kids.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Click the Toy button to cycle to Pusheen Cat
  console.log('Switching toy to Pusheen Cat...');
  const toyBtn = page.locator('button[title="Switch Character"]');
  await toyBtn.click();
  await page.waitForTimeout(3000);

  // Draw with Glitter Gold shader
  console.log('Selecting Glitter Gold and painting on Pusheen...');
  const goldBtn = page.locator('button[title="Sparkly Metallic"]');
  await goldBtn.click();
  await page.waitForTimeout(300);

  // Paint golden stripes or star on Pusheen
  await page.mouse.move(600, 360);
  await page.mouse.down();
  await page.mouse.move(680, 360, { steps: 5 });
  await page.mouse.up();

  await page.waitForTimeout(1000);

  const screenshotPath = path.join(rootDir, 'screenshots', 'kids-pusheen-check.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Saved Pusheen screenshot to ${screenshotPath}`);

  await browser.close();
}

testPusheen().catch(err => {
  console.error('Pusheen test failed:', err);
  process.exit(1);
});
