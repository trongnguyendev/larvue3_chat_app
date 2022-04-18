module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '1st': 'var(--color-1st))',
        '2nd': 'var(--color-2nd)',
        '3rd': 'var(--color-3rd)',
        '4th': 'var(--color-4th)',
        '5th': 'var(--color-5th)',
        'dv': 'var(--dv)',
      }
    },
  },
  plugins: [require("daisyui")],
}
