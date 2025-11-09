/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandlight: "#FFF8E1",
        brandyellow: "#FFD54F",
        branddark: "#F9A825",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
