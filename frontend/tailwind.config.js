/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1e293b", // Sidebar & Text
          gold: "#c5a447", // Buttons & Icons
          cream: "#fdfbf7", // Card background
          blue: "#1e3a8a", // Login page background
        },
      },
    },
  },
  plugins: [],
};
