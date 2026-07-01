import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6849E1",
          light: "rgba(124, 122, 234, 0.1)",
        },
        stat: "#7C7AEA",
        text: {
          DEFAULT: "#1A1A1A",
          muted: "rgba(26, 26, 26, 0.65)",
          cardTag: "rgba(255, 255, 255, 0.65)",
        },
        badge: {
          blue: "#2979FA",
          red: "#F5284B",
          orange: "#F56628",
          green: "#49C420",
        },
        nav: {
          outer: "#F6F6FD",
          link: "#57575A",
        },
        divider: "rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        nav: "0px 3px 10px rgba(0, 0, 0, 0.05)",
        card: "0px 16px 48px -4px rgba(26, 26, 26, 0.2)",
        badge: "0px 12px 10px rgba(26, 26, 26, 0.1)",
        cta: "0px 10px 20px rgba(31, 81, 218, 0.3)",
        logo: "0px 5px 14px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        pill: "999px",
        card: "32px",
        btn: "100px",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(118.92deg, rgb(102, 103, 228) 0%, rgba(102, 103, 228, 0.8) 100%)",
        "card-gradient": "linear-gradient(to bottom, rgba(26, 26, 26, 0), rgba(26, 26, 26, 0.8))",
      },
    },
  },
  plugins: [],
};
export default config;
