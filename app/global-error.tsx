"use client";

import { useEffect } from "react";

import { COLOR } from "@/config/design-tokens";

type GlobalErrorProps = {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLOR.background,
          color: COLOR.ink,
          fontFamily: "Rubik, system-ui, sans-serif",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>Critical application error</h1>
          <p style={{ marginTop: 12, color: "rgba(255,255,255,0.72)" }}>
            The site failed to render. Please retry.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 24,
              border: 0,
              borderRadius: 10,
              background: COLOR.primary,
              color: COLOR.ink,
              padding: "10px 16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
