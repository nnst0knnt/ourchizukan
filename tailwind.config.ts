import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        brand: "var(--color-brand)",
        accent: "var(--color-accent)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        focus: "var(--color-focus)",
        outline: "var(--color-outline)",
      },
    },
  },
};

export default config;
