import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#121212",
        surface: "#1E1E1E",
        ink: {
          DEFAULT: "#E0E0E0",
          soft: "#A0A0A0",
          mute: "#6B7280",
        },
        line: {
          DEFAULT: "#333333",
          soft: "#2A2A2A",
        },
        einstein: {
          DEFAULT: "#EAB308",
          soft: "#422006",
          ink: "#FEF08A",
        },
        marcus: {
          DEFAULT: "#9CA3AF",
          soft: "#1F2937",
          ink: "#F3F4F6",
        },
        ada: {
          DEFAULT: "#8B5CF6",
          soft: "#2E1065",
          ink: "#DDD6FE",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        bubble: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
