/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              marginTop: '0',
              marginBottom: '1rem',
              fontSize: '2.25rem',
              lineHeight: '2.5rem',
              fontWeight: '700',
            },
            h2: {
              marginTop: '0',
              marginBottom: '1rem',
              fontSize: '1.875rem',
              lineHeight: '2.25rem',
              fontWeight: '700',
            },
            h3: {
              marginTop: '0',
              marginBottom: '0.75rem',
              fontSize: '1.5rem',
              lineHeight: '2rem',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [],
};