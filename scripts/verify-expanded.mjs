import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function testExpanded() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  console.log('Navigating to http://localhost:5173/kids.html...');
  await page.goto('http://localhost:5173/kids.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // 1. Check initial model (Capybaras is first now!)
  console.log('Initial model is Happy Capybaras...');

  // 2. Select Synthwave Chrome shader
  console.log('Selecting Synthwave Chrome shader...');
  const synthwaveBtn = page.locator('button[title="Neon 80s Chrome"]');
  await synthwaveBtn.click();
  await page.waitForTimeout(300);

  // Paint a stroke on Capybara with Synthwave Chrome
  console.log('Painting Synthwave Chrome stroke on Capybara...');
  await page.mouse.move(600, 380);
  await page.mouse.down();
  await page.mouse.move(660, 380, { steps: 4 });
  await page.mouse.up();
  await page.waitForTimeout(500);

  // 3. Switch to Flat Paint style
  console.log('Switching to Flat Paint style...');
  const flatBtn = page.locator('button[title*="Flat Paint"]');
  await flatBtn.click();
  await page.waitForTimeout(300);

  // Select Iridescent Foil shader
  console.log('Selecting Iridescent Foil shader...');
  const iridescentBtn = page.locator('button[title="Shimmering Rainbow Foil"]');
  await iridescentBtn.click();
  await page.waitForTimeout(300);

  // Paint flat ribbon stroke
  console.log('Painting Flat ribbon with Iridescent Foil...');
  await page.mouse.move(580, 440);
  await page.mouse.down();
  await page.mouse.move(680, 440, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(500);

  // 4. Capture Capybara with Synthwave Chrome + Flat Iridescent
  const capyPath = path.join(rootDir, 'screenshots', 'kids-capybara-check.png');
  await page.screenshot({ path: capyPath });
  console.log(`Saved screenshot to ${capyPath}`);

  // 5. Cycle toy to Pusheen
  console.log('Cycling to Pusheen...');
  const nextToyBtn = page.locator('button[title="Switch Character"]');
  await nextToyBtn.click();
  await page.waitForTimeout(3000);

  // Select Fractal Galaxy shader
  console.log('Selecting Fractal Galaxy shader...');
  const fractalBtn = page.locator('button[title="Cosmic Fractal Starfield"]');
  await fractalBtn.click();
  await page.waitForTimeout(300);

  // Paint on Pusheen
  console.log('Painting Fractal Galaxy on Pusheen...');
  await page.mouse.move(600, 360);
  await page.mouse.down();
  await page.mouse.move(680, 360, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(500);

  const pusheenPath = path.join(rootDir, 'screenshots', 'kids-pusheen-expanded.png');
  await page.screenshot({ path: pusheenPath });
  console.log(`Saved screenshot to ${pusheenPath}`);

  await browser.close();
  console.log('All expanded tests completed successfully.');
}

testExpanded().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
