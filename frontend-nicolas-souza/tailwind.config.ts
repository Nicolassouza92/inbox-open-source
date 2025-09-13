import type { Config } from "tailwindcss";
import tailwindScrollbar from "tailwind-scrollbar";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-sent":
          "linear-gradient(to right, rgba(196, 181, 253, 0.20), rgba(167, 139, 250, 0.40))",
        "gradient-received": "linear-gradient(to left, #FFFFFF, #E5E7EB)",
        "gradient-card": "linear-gradient(to top right, #FFFFFF, #F3F4F6)",
      },
      boxShadow: {
        bubble: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        background: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          content: "var(--color-bg-content)",
        },
        text: {
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          accent: "var(--color-text-accent)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
        },
        message: {
          sent: "var(--color-message-sent)",
          received: "var(--color-message-received)",
        },
        border: "var(--color-border)",
      },
    },
  },
  plugins: [tailwindScrollbar, typography],
};
export default config;
