import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blossom: {
          background: "#FCF8F3",
          warm:       "#F8F3ED",
          card:       "#FFFDFC",
          green:      "#365A43",
          "green-hover": "#2D4B37",
          "green-soft":  "#E8F2EA",
          pink:       "#F7D7DE",
          "pink-light": "#FCECEF",
          beige:      "#EFE5DA",
          gold:       "#C69C6D",
          "gold-light": "#E8CFAE",
          rose:       "#C79072",
          ink:        "#2E2925",
          body:       "#6F6258",
          muted:      "#9A8D82",
          border:     "#EFE5DA"
        }
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans:    ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        soft:    "0 24px 70px rgba(54, 90, 67, 0.12)",
        card:    "0 10px 30px rgba(30, 20, 10, 0.05)",
        hover:   "0 25px 60px rgba(0, 0, 0, 0.08)",
        "hero-img": "0 40px 80px rgba(0, 0, 0, 0.10)"
      },
      borderRadius: {
        "card":    "28px",
        "card-lg": "36px",
        "input":   "14px",
        "video":   "20px"
      }
    }
  },
  plugins: []
};

export default config;
