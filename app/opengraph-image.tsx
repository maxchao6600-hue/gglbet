import { ImageResponse } from "next/og";

import { COLOR } from "@/config/design-tokens";
import { SITE_NAME, SITE_TAGLINE } from "@/config/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: COLOR.background,
          color: COLOR.ink,
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: COLOR.primary,
            fontWeight: 700,
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800 }}>
            GGLBET official content hub
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.72)" }}>
            {SITE_TAGLINE}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 6,
            width: 180,
            background: COLOR.primary,
            borderRadius: 999,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
