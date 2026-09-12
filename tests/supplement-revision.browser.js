// Run with the production static preview on localhost:3003.
export default async function checkSupplementRevision(page) {
  const results = [];
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`http://127.0.0.1:3003/geometric-signatures-companion-website/supplement/?qc=${Date.now()}`, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      unstyledMath: [...document.querySelectorAll(".katex-mathml")].some(el => getComputedStyle(el).position !== "absolute"),
      wideCaptions: [...document.querySelectorAll(".result-table-heading")].some(el => el.getBoundingClientRect().width > innerWidth),
      blending: [...document.querySelectorAll("main img")].every(el => getComputedStyle(el).mixBlendMode === "multiply"),
    }));
    if (result.overflow || result.unstyledMath || result.wideCaptions || !result.blending) throw new Error(JSON.stringify({width, ...result}));
    results.push({ width, ...result });
  }
  return results;
}
