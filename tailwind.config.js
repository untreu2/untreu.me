/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Monochrome editorial palette.
        paper: '#f5f5f2',
        surface: '#ffffff',
        ink: '#0d0d0d',
        muted: '#626262',
        line: '#cdcdca',
        accent: {
          DEFAULT: '#0d0d0d',
          soft: '#e8e8e5',
          600: '#252525',
          700: '#0d0d0d',
        },
      },
      fontFamily: {
        sans: [
          '"Nunito Sans"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'sans-serif',
        ],
        display: [
          '"Libertinus Serif"',
          'Libertinus',
          'Georgia',
          'serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      maxWidth: {
        content: '42rem',
      },
    },
  },
  plugins: [],
}
