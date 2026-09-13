import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();

  // 1. Mobile Phone Test (Pixel 7 / iPhone 14 dimensions: 390x844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);

  // Check top bar buttons bounding boxes
  const headerButtons = await mobilePage.$$('header button');
  console.log('Mobile header buttons count:', headerButtons.length);
  for (let i = 0; i < headerButtons.length; i++) {
    const box = await headerButtons[i].boundingBox();
    console.log(`Button ${i} bounds: x=${box.x.toFixed(1)}, right=${(box.x + box.width).toFixed(1)} (screen 390)`);
    if (box.x + box.width > 390) {
      console.error(`ALERT: Button ${i} overflows screen width 390!`);
    }
  }

  // Check mobile dock
  const dock = await mobilePage.$('nav[aria-label="Mobile Controls"]');
  console.log('Mobile dock visible:', !!dock && (await dock.isVisible()));

  // Check left toolbar is hidden
  const leftToolbar = await mobilePage.$('aside[aria-label="Drawing Tools"]');
  console.log('Left toolbar hidden on mobile:', !(await leftToolbar.isVisible()));

  // Capture screenshot of mobile phone layout
  await mobilePage.screenshot({ path: 'mobile-preview-layout.png' });
  console.log('Captured mobile-preview-layout.png');

  // Test tapping Color in mobile dock
  const colorBtn = await mobilePage.$('button[title="Choose Color"]');
  if (colorBtn) {
    await colorBtn.click();
    await mobilePage.waitForTimeout(300);
    const colorDrawer = await mobilePage.$('text=Paint Colors');
    console.log('Color drawer opened:', !!colorDrawer && (await colorDrawer.isVisible()));
    await mobilePage.screenshot({ path: 'mobile-preview-color-drawer.png' });
    console.log('Captured mobile-preview-color-drawer.png');
  }

  // Test Size drawer
  await mobilePage.click('button[title="Choose Size"]');
  await mobilePage.waitForTimeout(300);
  await mobilePage.screenshot({ path: 'mobile-preview-size-drawer.png' });

  // Test Brush drawer
  await mobilePage.click('button[title="Brush and Play-Doh Styles"]');
  await mobilePage.waitForTimeout(300);
  await mobilePage.screenshot({ path: 'mobile-preview-brush-drawer.png' });

  // Test Orbit toggle to hide D-pad
  const orbitBtn = await mobilePage.$('button[title="Hide Camera Controls"]');
  if (orbitBtn) {
    await orbitBtn.click();
    await mobilePage.waitForTimeout(300);
    await mobilePage.screenshot({ path: 'mobile-preview-clean-canvas.png' });
    console.log('Captured mobile-preview-clean-canvas.png');
  }

  // 2. Desktop Test
  const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);
  const desktopLeftToolbar = await desktopPage.$('aside[aria-label="Drawing Tools"]');
  console.log('Desktop left toolbar visible:', await desktopLeftToolbar.isVisible());
  const desktopDock = await desktopPage.$('nav[aria-label="Mobile Controls"]');
  console.log('Desktop mobile dock hidden:', !(await desktopDock.isVisible()));

  await browser.close();
  console.log('Verification finished successfully!');
}

main().catch(console.error);
