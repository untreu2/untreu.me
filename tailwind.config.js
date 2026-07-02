/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Page background — soft off-white.
        paper: '#fbfbfa',
        // Elevated surface — pure white panels separated by hairline borders.
        surface: '#ffffff',
        // Foreground / "ink" — near-black warm gray.
        ink: '#1c1c1c',
        // Muted foreground for secondary text.
        muted: '#6b6b6b',
        // Hairline border tone.
        line: '#eaeaea',
        // Brand accent.
        accent: {
          DEFAULT: '#2596be',
          soft: '#eaf5f9',
          600: '#1f82a7',
          700: '#1a6e8f',
        },
      },
      fontFamily: {
        sans: [
          '"Nunito Sans"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
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
