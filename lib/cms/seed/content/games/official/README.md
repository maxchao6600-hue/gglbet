# Official game catalog snapshot

The ~6MB `gglbet5-games.json` lives at:

`public/cms/gglbet5-games.json`

It is loaded at runtime via `loadOfficialGamesSnapshot()` so Cloudflare
Workers Static Assets serve it — it must not be statically imported into
the OpenNext server bundle.
