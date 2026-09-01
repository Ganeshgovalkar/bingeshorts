/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          base: '#070709',
          card: '#111116',
          elevated: '#181820',
          hover: '#1E1E28'
        },
        violet: {
          electric: '#9D4EDD'
        },
        lime: {
          acid: '#CCFF00'
        },
        coral: {
          hot: '#FF4757'
        },
        blue: {
          electric: '#00D2FF'
        },
        pink: {
          bright: '#FF007F'
        }
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
        normal: '-0.01em',
        wide: '0.05em',
        wider: '0.1em'
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px'
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    },
  },
  plugins: [],
}
