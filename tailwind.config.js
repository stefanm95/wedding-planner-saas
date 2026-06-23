/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#201a18",
        blush: "#f7e9e4",
        champagne: "#f5d9b8",
        sage: "#dde8d5",
        cocoa: "#6f5044"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(57, 38, 31, 0.12)"
      }
    }
  },
  plugins: [],
};
