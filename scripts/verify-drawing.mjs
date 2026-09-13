import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function testDrawing() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:5173/kids.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  // Center of the character is around (640, 400)
  // Let's draw a curvy smiley stroke across the belly (from 580, 480 to 700, 480) with Rainbow Dough!
  console.log('Drawing stroke 1 with Rainbow Dough...');
  await page.mouse.move(580, 480);
  await page.mouse.down();
  await page.mouse.move(610, 510, { steps: 5 });
  await page.mouse.move(640, 520, { steps: 5 });
  await page.mouse.move(670, 510, { steps: 5 });
  await page.mouse.move(700, 480, { steps: 5 });
  await page.mouse.up();

  await page.waitForTimeout(500);

  // Now select Sunshine Yellow color button and draw cute dots on the cheeks
  console.log('Selecting Yellow color and drawing cheek dots...');
  // Click yellow button (3rd color bubble in right panel)
  const yellowBtn = page.locator('button[title="Sunshine Yellow"]');
  await yellowBtn.click();
  await page.waitForTimeout(300);

  // Left cheek
  await page.mouse.move(480, 400);
  await page.mouse.down();
  await page.mouse.move(485, 405, { steps: 2 });
  await page.mouse.up();

  await page.waitForTimeout(300);

  // Right cheek
  await page.mouse.move(800, 400);
  await page.mouse.down();
  await page.mouse.move(805, 405, { steps: 2 });
  await page.mouse.up();

  await page.waitForTimeout(1000);

  const screenshotPath = path.join(rootDir, 'screenshots', 'kids-painted-check.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Saved painted screenshot to ${screenshotPath}`);

  await browser.close();
}

testDrawing().catch(err => {
  console.error('Drawing test failed:', err);
  process.exit(1);
});
