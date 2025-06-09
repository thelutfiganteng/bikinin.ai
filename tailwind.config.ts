import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced blue palette with neon variations
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
          neon: "#00f2ff", // Neon blue
        },
        // Enhanced purple palette with neon variations
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
          neon: "#bf00ff", // Neon purple
        },
        // Enhanced indigo palette with neon variations
        indigo: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
          neon: "#6600ff", // Neon indigo
        },
        // New neon colors
        neon: {
          pink: "#ff00ff",
          green: "#00ff8c",
          yellow: "#ffff00",
          orange: "#ff9900",
          red: "#ff0066",
          cyan: "#00ffff",
        },
        // Sky colors
        sky: {
          twilight: "#1e0b4b", // Deep twilight blue
          dusk: "#4b0082", // Deep purple dusk
          night: "#191970", // Midnight blue
          aurora: "#0c1445", // Aurora blue
          dawn: "#5d3fd3", // Purple dawn
        },
      },
      boxShadow: {
        neon: "0 0 5px theme('colors.blue.neon'), 0 0 20px theme('colors.blue.neon')",
        "neon-purple": "0 0 5px theme('colors.purple.neon'), 0 0 20px theme('colors.purple.neon')",
        "neon-indigo": "0 0 5px theme('colors.indigo.neon'), 0 0 20px theme('colors.indigo.neon')",
        "neon-cyan": "0 0 5px theme('colors.neon.cyan'), 0 0 20px theme('colors.neon.cyan')",
        "neon-pink": "0 0 5px theme('colors.neon.pink'), 0 0 20px theme('colors.neon.pink')",
        "neon-green": "0 0 5px theme('colors.neon.green'), 0 0 20px theme('colors.neon.green')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 5px theme('colors.blue.neon'), 0 0 20px theme('colors.blue.neon')",
          },
          "50%": {
            boxShadow: "0 0 15px theme('colors.purple.neon'), 0 0 30px theme('colors.purple.neon')",
          },
        },
        "neon-pulse": {
          "0%, 100%": {
            textShadow:
              "0 0 4px #fff, 0 0 10px #fff, 0 0 15px theme('colors.blue.neon'), 0 0 20px theme('colors.blue.neon')",
          },
          "50%": {
            textShadow:
              "0 0 4px #fff, 0 0 8px #fff, 0 0 12px theme('colors.purple.neon'), 0 0 16px theme('colors.purple.neon')",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
