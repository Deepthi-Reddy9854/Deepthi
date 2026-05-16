/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Space Grotesk'", 'sans-serif'],
        body: ["'Inter'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      colors: {
        primary: '#BAFF39',
        'primary-fg': '#0F1410',
        dark: '#0F1410',
        light: '#F4F7F2',
        earth: '#8C7355',
      },
    },
  },
  plugins: [],
}
