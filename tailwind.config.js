export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Hind Siliguri', 'sans-serif'],
        bangla: ['Hind Siliguri', 'sans-serif'],
      },
      colors: {
        brand: { DEFAULT: '#087f5b', dark: '#066649', light: '#e8f7f1', lime: '#d8f3e7' },
      },
      boxShadow: { soft: '0 12px 40px rgba(17, 50, 40, 0.08)' },
    },
  },
  plugins: [],
}
