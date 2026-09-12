// Run against the static preview; detects internal collisions even without page overflow.
export default async function checkHeroLayout(page) {
  const results = [];
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:3003/geometric-signatures-companion-website/", { waitUntil: "networkidle" });
  for (const width of [320, 390, 560, 714, 900, 1024, 1100, 1280, 1440, 1614, 1920, 2560]) {
    await page.setViewportSize({ width, height: 930 });
    await page.evaluate(() => document.fonts.ready);
    // Capture after layout/animations settle before measuring text containment.
    await page.screenshot();
    const result = await page.evaluate(() => {
      const title = document.querySelector(".companion-hero h1");
      const figure = document.querySelector(".hero-geometry");
      const t = title.getBoundingClientRect();
      const f = figure.getBoundingClientRect();
      return {
        titleOverflow: title.scrollWidth > title.clientWidth + 1,
        pageOverflow: document.documentElement.scrollWidth > innerWidth,
        collision: t.left < f.right && t.right > f.left && t.top < f.bottom && t.bottom > f.top,
      };
    });
    if (Object.values(result).some(Boolean)) throw new Error(JSON.stringify({ width, ...result }));
    results.push({ width, ...result });
  }
  return results;
}
