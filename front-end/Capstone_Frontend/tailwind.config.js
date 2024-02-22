/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        jump: "jump 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both"
      },
      keyframes: {
        jump: {
          "0%": { color: "white", transform: "scale(0.5)" },
          "50%": { transform: "scale(1.25)" },
          "100%": { color: "red", transform: "scale(1)" }
        }
      }
    },
    container: {
      center: true
    }
  },
  plugins: []
};
