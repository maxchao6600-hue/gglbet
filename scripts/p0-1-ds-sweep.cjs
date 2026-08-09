/**
 * Bulk-replace remaining plain card / old FAQ chrome with Design System classes.
 * Run: node scripts/p0-1-ds-sweep.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGETS = [
  "features",
  "components",
];

const REPLACEMENTS = [
  // Old FAQ accordion chrome
  [
    'className="group rounded-card border border-border bg-card p-card open:border-border-brand"',
    'className="home-v2-glass group rounded-card p-card open:border-border-brand"',
  ],
  [
    "className=\"group rounded-card border border-border bg-card p-card open:border-border-brand\"",
    'className="home-v2-glass group rounded-card p-card open:border-border-brand"',
  ],
  // Plain panels
  [
    'className="rounded-card border border-border bg-card p-card"',
    'className="home-v2-glass rounded-card p-card"',
  ],
  [
    'className="rounded-card border border-border bg-card px-4 py-4 text-sm text-ink-muted"',
    'className="home-v2-glass rounded-card px-4 py-4 text-sm text-ink-muted"',
  ],
  [
    'className="rounded-card border border-border bg-card px-4 py-4 text-sm leading-relaxed text-ink-muted"',
    'className="home-v2-glass rounded-card px-4 py-4 text-sm leading-relaxed text-ink-muted"',
  ],
  [
    'className="mt-8 rounded-card border border-border bg-card p-card text-ink-muted"',
    'className="mt-8 home-v2-glass rounded-card p-card text-ink-muted"',
  ],
  [
    'className="rounded-control border border-border bg-card px-3 py-1 text-xs font-medium text-ink-muted"',
    'className="home-v2-glass rounded-control px-3 py-1 text-xs font-medium text-ink-muted"',
  ],
  // Elevated / muted panels → glass
  [
    'className="rounded-card border border-border bg-surface-elevated p-card"',
    'className="home-v2-glass rounded-card p-card"',
  ],
  [
    '"rounded-card border border-border bg-surface-elevated p-card"',
    '"home-v2-glass rounded-card p-card"',
  ],
  [
    '"rounded-card border border-border bg-surface-muted p-card text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6"',
    '"home-v2-glass rounded-card p-card text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6"',
  ],
  [
    '"rounded-card border border-border bg-surface-elevated p-card"',
    '"home-v2-glass rounded-card p-card"',
  ],
  // Form controls on toolbars
  [
    'className="h-11 w-full rounded-control border border-border bg-card px-3 text-sm text-ink"',
    'className="h-11 w-full rounded-control border border-white/10 bg-[rgb(22_24_29_/_0.78)] px-3 text-sm text-ink"',
  ],
  [
    'className="h-11 w-full rounded-control border border-border bg-card/80 px-3 text-sm text-ink"',
    'className="h-11 w-full rounded-control border border-white/10 bg-[rgb(22_24_29_/_0.78)] px-3 text-sm text-ink"',
  ],
  // GeoContent elevated
  [
    '"rounded-card border border-border bg-surface-elevated p-card"',
    '"home-v2-glass rounded-card p-card"',
  ],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

let filesTouched = 0;
let replacements = 0;
for (const root of TARGETS) {
  const abs = path.join(ROOT, root);
  if (!fs.existsSync(abs)) continue;
  for (const file of walk(abs)) {
    let src = fs.readFileSync(file, "utf8");
    let next = src;
    for (const [from, to] of REPLACEMENTS) {
      if (next.includes(from)) {
        const count = next.split(from).length - 1;
        next = next.split(from).join(to);
        replacements += count;
      }
    }
    if (next !== src) {
      fs.writeFileSync(file, next);
      filesTouched += 1;
      console.log("updated", path.relative(ROOT, file));
    }
  }
}
console.log(`files=${filesTouched} replacements=${replacements}`);
