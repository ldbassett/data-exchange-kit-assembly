export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1f6feb",
        accent: "#ffd200"
      },
      boxShadow: {
        'glow': '0 0 0.75rem rgba(31,110,235,0.8)'
      },
    },
  },
  plugins: [],
};
