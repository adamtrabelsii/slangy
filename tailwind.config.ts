import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Slangy — warm "sunset" palette (orange → amber)
        sg: {
          primary: "#FB7427",
          "primary-deep": "#EA580C",
          amber: "#F59E0B",
          gold: "#FBBF24",
          ember: "#C2410C",
          ink: "#2B1A12",
          sub: "#8A7363",
          light: "#B8A698",
          line: "#F0E2D6",
          success: "#0E9E6E",
          danger: "#E0533F",
          bg: "#FFF7ED",
          // legacy aliases (kept warm so any stray class still reads on-brand)
          coral: "#FB7427",
          "coral-deep": "#EA580C",
          pink: "#FB923C",
          violet: "#C2410C",
          "violet-deep": "#9A3412",
          mint: "#0E9E6E",
          "mint-deep": "#0B7C56",
          blue: "#D97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        "900": "900",
      },
      borderRadius: {
        pill: "28px",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shake: {
          "0%,100%": { transform: "translateX(0)" },
          "20%,60%": { transform: "translateX(-6px)" },
          "40%,80%": { transform: "translateX(6px)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        pulse2: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(234,88,12,.45)" },
          "50%": { boxShadow: "0 0 0 12px rgba(234,88,12,0)" },
        },
        rise: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        pop: "pop 0.2s ease-out",
        shake: "shake 0.4s ease-in-out",
        float: "float 3s ease-in-out infinite",
        pulse2: "pulse2 2.2s ease-in-out infinite",
        rise: "rise 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
