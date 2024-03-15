/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        jump: "jump 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "bounce-slow": "bounce-slow 1.5s infinite"
      },
      keyframes: {
        jump: {
          "0%": { color: "white", transform: "scale(0.5)" },
          "50%": { transform: "scale(1.25)" },
          "100%": { color: "red", transform: "scale(1)" }
        },
        "bounce-slow": {
          "0%": {
            transform: "translateY(-10%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
            color: "#4f46e5"
          },
          "100%": {
            transform: "translateY(-10%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
          }
        }
      }
    },
    container: {
      center: true
    }
  },
  plugins: []
};
