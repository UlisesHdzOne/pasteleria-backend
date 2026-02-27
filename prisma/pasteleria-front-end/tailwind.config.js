/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pastel: {
          100: "#fce4e4",
          200: "#f9c9c9",
          300: "#f5a3a3",
          400: "#f17c7c",
          500: "#ed5656",
          600: "#e33030",
        },
      },
    },
  },
  safelist: [
    "bg-gradient-to-r",
    "from-blue-600",
    "to-indigo-600",
    "bg-clip-text",
    "text-transparent",
    "hover:scale-105",
    "transition-transform",
    "duration-200",
  ],
  plugins: [], // sin Flowbite
};
