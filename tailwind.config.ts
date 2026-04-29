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
        anshuman: {
          DEFAULT: "#3B82F6",
          soft: "#1E3A8A",
          ink: "#DBEAFE",
        },
        abhimanyu: {
          DEFAULT: "#10B981",
          soft: "#064E3B",
          ink: "#D1FAE5",
        },
        kshitij: {
          DEFAULT: "#F97316",
          soft: "#7C2D12",
          ink: "#FFEDD5",
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
