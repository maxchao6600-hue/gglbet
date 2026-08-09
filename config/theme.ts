import {
  BREAKPOINT,
  COLOR,
  CONTAINER,
  LAYOUT,
  MOTION,
  RADIUS,
  SPACING,
  TYPEFACE,
} from "@/config/design-tokens";

export const themeConfig = {
  color: COLOR,
  radius: RADIUS,
  spacing: SPACING,
  container: CONTAINER,
  breakpoint: BREAKPOINT,
  motion: MOTION,
  typeface: TYPEFACE,
  layout: LAYOUT,
} as const;

export type ThemeConfig = typeof themeConfig;
