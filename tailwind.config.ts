import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefcf3",
          100: "#d6f7e2",
          200: "#aeefc6",
          300: "#76e2a3",
          400: "#3ccd7c",
          500: "#16b35e",
          600: "#0a8f4a",
          700: "#09713d",
          800: "#0b5933",
          900: "#0a492b",
        },
        ink: {
          DEFAULT: "#0f1722",
          soft: "#1b2735",
          line: "#27384a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        "900": "900",
      },
      boxShadow: {
        pop: "0 4px 0 0 rgba(0,0,0,0.18)",
        "pop-sm": "0 3px 0 0 rgba(0,0,0,0.18)",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shake: {
          "0%,100%": { transform: "translateX(0)" },
          "20%,60%": { transform: "translateX(-6px)" },
          "40%,80%": { transform: "translateX(6px)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        pop: "pop 0.25s ease-out",
        shake: "shake 0.4s ease-in-out",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
