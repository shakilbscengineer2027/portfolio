/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#050B1F", 900: "#0A1533", 800: "#0B1735" },
        neon: { blue: "#168BFF", cyan: "#00D9FF", purple: "#8B5CFF", pink: "#F02CC8" },
        ink: { main: "#F3F7FF", soft: "#A9B8D8" },
      },
      fontFamily: { sans: ["var(--font-nunito)", "system-ui", "sans-serif"] },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
      },
      animation: { float: "float 5s ease-in-out infinite", spinSlow: "spinSlow 24s linear infinite" },
    },
  },
  plugins: [],
};
