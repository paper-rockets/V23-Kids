import { chromium } from 'playwright';

async function debugNebula() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const logs = [];
  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  await page.goto('http://localhost:5173/kids.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Click Galaxy Nebula
  console.log('Selecting Galaxy Nebula...');
  const nebulaBtn = page.locator('button[title="Deep Space Nebula"]');
  await nebulaBtn.click();
  await page.waitForTimeout(500);

  // Draw a stroke
  console.log('Drawing stroke with Galaxy Nebula...');
  await page.mouse.move(600, 400);
  await page.mouse.down();
  await page.mouse.move(660, 400, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(1000);

  console.log('--- Shader & WebGL Console Logs ---');
  logs.forEach(l => {
    if (l.toLowerCase().includes('webgl') || l.toLowerCase().includes('error') || l.toLowerCase().includes('warn') || l.toLowerCase().includes('shader')) {
      console.log(l);
    }
  });

  await browser.close();
}

debugNebula().catch(console.error);
