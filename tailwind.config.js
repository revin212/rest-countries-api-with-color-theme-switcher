/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-background': 'var(--color-main-background)',
        'main-elements': 'var(--color-main-elements)',
        'main-color-text': 'var(--color-main-text)',
        'main-color-input': 'var(--color-main-input)',
        'main-color-shadow': 'var(--color-main-shadow)',
      },

      fontFamily: {
        'primary-font': ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

