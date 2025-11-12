/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          dark: '#242424',
        },
        foreground: {
          light: '#213547',
          dark: 'rgba(255, 255, 255, 0.87)',
        }
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        'pretendard': ['Pretendard', 'sans-serif'],
        wild: ['Wild', 'sans-serif'],
        dimibang: ['dimibang', 'sans-serif'],

      },
    },
  },
  plugins: [],
}
