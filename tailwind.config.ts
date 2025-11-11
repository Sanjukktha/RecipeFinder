import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out forwards'
      },
      colors: {
        brand: {
          50: "#fefce8",   // Very light yellow
          100: "#fef9c3",  // Light yellow
          200: "#fef08a",  // Lighter yellow
          300: "#fde047",  // Light yellow
          400: "#facc15",  // Yellow
          500: "#eab308",  // Primary yellow
          600: "#ca8a04",  // Darker yellow
          700: "#a16207",  // Dark yellow
          800: "#1e3a8a",  // Dark blue
          900: "#1e40af",  // Darker blue
        },
        blue: {
          50: "#eff6ff",   // Very light blue
          100: "#dbeafe",  // Light blue
          200: "#bfdbfe",  // Lighter blue
          300: "#93c5fd",  // Light blue
          400: "#60a5fa",  // Blue
          500: "#3b82f6",  // Primary blue
          600: "#2563eb",  // Darker blue
          700: "#1d4ed8",  // Dark blue
          800: "#1e40af",  // Darker blue
          900: "#1e3a8a",  // Darkest blue
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      zIndex: {
        100: "100",
        "-10": "-10",
      },
    },
  },
};
export default config;
