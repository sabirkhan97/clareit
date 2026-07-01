/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base — warm paper, not pure white
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        'paper-dim': 'rgb(var(--color-paper-dim) / <alpha-value>)',
        // Ink — deep navy-charcoal, not pure black
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          900: 'rgb(var(--color-ink-900) / <alpha-value>)',
          800: 'rgb(var(--color-ink-800) / <alpha-value>)',
          700: 'rgb(var(--color-ink-700) / <alpha-value>)',
          600: 'rgb(var(--color-ink-600) / <alpha-value>)',
          500: 'rgb(var(--color-ink-500) / <alpha-value>)',
          400: 'rgb(var(--color-ink-400) / <alpha-value>)',
          300: 'rgb(var(--color-ink-300) / <alpha-value>)',
        },
        // Signature accent — electric indigo
        signal: {
          DEFAULT: '#4F46E5',
          50: '#EEEDFD',
          100: '#DEDBFB',
          300: '#A8A0F5',
          400: '#8478F0',
          500: '#4F46E5',
          600: '#3F35C7',
          700: '#332BA3',
        },
        // Warm secondary accent for contrast moments
        ember: {
          DEFAULT: '#E8743B',
          400: '#EE9468',
          500: '#E8743B',
          600: '#C95A26',
        },
        line: 'rgb(var(--color-line) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 5rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2rem, 3.5vw, 3.25rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(17,21,28,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,21,28,0.06) 1px, transparent 1px)',
        'signal-gradient': 'linear-gradient(135deg, #4F46E5 0%, #8478F0 50%, #E8743B 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        blink: 'blink 1.1s step-end infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        soft: '0 2px 20px rgba(17,21,28,0.06)',
        lifted: '0 20px 60px -15px rgba(17,21,28,0.25)',
        glow: '0 0 0 1px rgba(79,70,229,0.15), 0 8px 30px rgba(79,70,229,0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
