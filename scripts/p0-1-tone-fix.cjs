const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "node_modules" && e.name !== ".next") walk(full, out);
    } else if (e.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

let n = 0;
for (const file of walk("features")) {
  let s = fs.readFileSync(file, "utf8");
  const o = s;
  s = s.replace(
    /(\nid="[^"]*faq[^"]*"\r?\n\s*padding="lg"\r?\n\s*containerSize="wide"\r?\n\s*aria-labelledby="[^"]+"\r?\n)\s*className="bg-surface"/g,
    '$1        tone="glow"',
  );
  s = s.replace(
    /className="bg-surface"(\r?\n\s*>)/g,
    'tone="muted"$1',
  );
  if (s !== o) {
    fs.writeFileSync(file, s);
    n += 1;
    console.log("updated", file);
  }
}
console.log("files", n);
