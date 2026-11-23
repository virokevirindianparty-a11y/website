import localFont from "next/font/local";

// Self-hosted variable fonts (from @fontsource-variable, OFL-licensed - see
// src/fonts/). Using next/font/google made every build download font files
// from Google, which intermittently failed on Netlify's build servers.

export const montserrat = localFont({
  src: "../fonts/montserrat-latin-wght-normal.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});

export const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const notoDevanagari = localFont({
  src: "../fonts/noto-sans-devanagari-devanagari-wght-normal.woff2",
  variable: "--font-noto-devanagari",
  weight: "100 900",
  display: "swap",
});

export const fontVariables = `${montserrat.variable} ${inter.variable} ${notoDevanagari.variable}`;
