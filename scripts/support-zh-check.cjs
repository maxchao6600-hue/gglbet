const pages = [
  "/zh/support",
  "/zh/faq",
  "/zh/payment",
  "/zh/download",
  "/zh/responsible-gaming",
  "/zh/about",
  "/zh/editorial-policy",
  "/zh/about-our-team",
  "/zh/contact",
];

(async () => {
  for (const p of pages) {
    const r = await fetch(`http://localhost:3000${p}`);
    const h = await r.text();
    const pending = (h.match(/中文待補/g) || []).length;
    const m = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const h1 = (m?.[1] || "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 70);
    console.log(`${p} pending=${pending} h1=${h1}`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
