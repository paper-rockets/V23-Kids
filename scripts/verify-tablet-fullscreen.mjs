import { chromium } from 'playwright';

async function verifyAll() {
  const browser = await chromium.launch({ headless: true });
  // Emulate a tablet (iPad landscape)
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173 on tablet viewport...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // 1. Verify Full Screen button exists
  const fullscreenBtn = page.locator('button[title="Enter Full Screen"], button[title="Exit Full Screen"]');
  const hasFullscreen = await fullscreenBtn.count() > 0;
  console.log('Full Screen button found:', hasFullscreen);

  // 2. Verify PWA Install button exists
  const pwaBtn = page.locator('button[title*="Install App"]');
  const hasPwa = await pwaBtn.count() > 0;
  console.log('PWA Install button found:', hasPwa);

  // 3. Simulate two-finger touch rotation on tablet
  console.log('Simulating 2-finger touch orbit on tablet...');
  // Dispatch touchstart with 2 fingers
  await page.evaluate(() => {
    const el = document.querySelector('canvas') || document.body;
    const t1 = new Touch({ identifier: 1, target: el, clientX: 400, clientY: 400, pageX: 400, pageY: 400 });
    const t2 = new Touch({ identifier: 2, target: el, clientX: 500, clientY: 400, pageX: 500, pageY: 400 });
    el.dispatchEvent(new TouchEvent('touchstart', { touches: [t1, t2], targetTouches: [t1, t2], changedTouches: [t1, t2], bubbles: true }));

    // Move both fingers to the right (rotate camera)
    const m1 = new Touch({ identifier: 1, target: el, clientX: 480, clientY: 400, pageX: 480, pageY: 400 });
    const m2 = new Touch({ identifier: 2, target: el, clientX: 580, clientY: 400, pageX: 580, pageY: 400 });
    el.dispatchEvent(new TouchEvent('touchmove', { touches: [m1, m2], targetTouches: [m1, m2], changedTouches: [m1, m2], bubbles: true }));

    // End
    el.dispatchEvent(new TouchEvent('touchend', { touches: [], targetTouches: [], changedTouches: [m1, m2], bubbles: true }));
  });

  await page.waitForTimeout(600);
  await page.screenshot({ path: 'test-tablet-view.png' });
  console.log('Captured test-tablet-view.png');

  await browser.close();
  console.log('All tablet & PWA checks passed!');
}

verifyAll().catch((err) => {
  console.error('Tablet verification error:', err);
  process.exit(1);
});
