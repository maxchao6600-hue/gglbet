/**
 * TypeScript mirror of brand tokens for non-CSS consumers
 * (metadata, OG images, manifest, CMS previews).
 */

export const COLOR = {
  primary: "#EC008C",
  primaryHover: "#CA008B",
  primaryActive: "#B0007A",
  secondary: "#716AE7",
  accent: "#FF0198",
  success: "#22C55E",
  warning: "#F5A524",
  danger: "#EF4444",
  info: "#38BDF8",
  background: "#0A0B0D",
  surface: "#16181D",
  surfaceElevated: "#1E2128",
  surfaceMuted: "#23252B",
  card: "#35373D",
  borderStrong: "#534759",
  ink: "#FFFFFF",
} as const;

export const RADIUS = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.625rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
} as const;

export const SPACING = {
  pageX: {
    mobile: "1rem",
    tablet: "1.5rem",
    desktop: "2rem",
  },
  section: {
    sm: "2.5rem",
    md: "4rem",
    lg: "6rem",
  },
  card: "1.25rem",
} as const;

export const CONTAINER = {
  narrow: "42rem",
  content: "72rem",
  wide: "83rem",
} as const;

export const BREAKPOINT = {
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const MOTION = {
  fast: "140ms",
  base: "200ms",
  slow: "320ms",
} as const;

export const TYPEFACE = {
  family: "Rubik",
  weights: [400, 500, 600, 700] as const,
} as const;

export const LAYOUT = {
  headerHeight: "4.25rem",
  controlHeight: {
    sm: "2.25rem",
    md: "2.5rem",
    lg: "3rem",
  },
} as const;
