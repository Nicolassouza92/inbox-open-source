import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Na v3, usamos 'extend' para adicionar nossas cores customizadas
      colors: {
        background: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
        },
        text: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          accent: 'var(--color-text-accent)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
        },
        message: {
          sent: 'var(--color-message-sent)',
          received: 'var(--color-message-received)',
        },
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [],
};
export default config;