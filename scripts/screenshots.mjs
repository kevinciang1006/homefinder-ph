import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";

const shots = [
  { name: "home", path: "/" },
  { name: "listings-map", path: "/properties", waitForMap: true },
  { name: "property-detail", path: "/properties/prop-001" },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

let tileFailures = 0;
page.on("requestfailed", (req) => {
  if (req.url().includes("tile.openstreetmap.org")) tileFailures++;
});

for (const { name, path, waitForMap } of shots) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  if (waitForMap) await page.getByRole("tab", { name: "Map" }).click();
  if (waitForMap) await page.waitForSelector(".maplibregl-canvas", { timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`saved ${OUT}/${name}.png`);
}

console.log(`map tile request failures: ${tileFailures}`);
await browser.close();
