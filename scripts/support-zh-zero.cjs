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
    const generics = (
      h.match(/>\s*(Learn More|Read More|Continue|Explore)\s*</gi) || []
    ).length;
    console.log(`${p} pending=${pending} genericCta=${generics}`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
