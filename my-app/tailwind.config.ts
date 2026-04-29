import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        brand: {
          purple: "#8b5cf6",
          pink: "#ec4899",
          blue: "#3b82f6",
          yellow: "#facc15",
          green: "#22c55e",
          orange: "#f97316",
        },
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
        elastic: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backdropBlur: {
        "4xl": "72px",
      },
      boxShadow: {
        glow: "0 0 40px 8px rgba(139,92,246,0.4)",
        "glow-pink": "0 0 40px 8px rgba(236,72,153,0.4)",
        "glow-blue": "0 0 40px 8px rgba(59,130,246,0.4)",
        "glow-yellow": "0 0 40px 8px rgba(250,204,21,0.4)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "spin-reverse": "spin 18s linear infinite reverse",
        float: "float 5s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-18px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
