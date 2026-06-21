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
        // Slangy brand (neuro-tone design system)
        sg: {
          coral: "#FF6B5B",
          "coral-deep": "#F1485B",
          pink: "#FF4E86",
          violet: "#7C3AED",
          "violet-deep": "#5b22c4",
          gold: "#FFB81C",
          mint: "#16C79A",
          "mint-deep": "#0E9E79",
          blue: "#3B6FE8",
          ink: "#111827",
          sub: "#6B7280",
          light: "#9CA3AF",
          success: "#10B981",
          bg: "#F5F6FA",
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
          "0%": { transform: "scale(0.85)", opacity: "0" },
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
          "0%,100%": { boxShadow: "0 0 0 0 rgba(255,78,108,.5)" },
          "50%": { boxShadow: "0 0 0 13px rgba(255,78,108,0)" },
        },
        flame: {
          "0%,100%": { transform: "rotate(-4deg) scale(1)" },
          "50%": { transform: "rotate(4deg) scale(1.08)" },
        },
      },
      animation: {
        pop: "pop 0.2s ease-out",
        shake: "shake 0.4s ease-in-out",
        float: "float 3s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
        flame: "flame 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
