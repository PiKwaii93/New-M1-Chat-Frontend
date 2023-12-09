/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1476ff",
        "primary-hover": "#004CB8",
        secondary: "#87B8FF",
        light: "#f9faff",
      },
    },
  },
  plugins: [],
};
