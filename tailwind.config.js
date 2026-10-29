/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#09090b',
        surface: '#121215',
        'surface-subtle': '#18181b',
        border: 'rgba(255, 255, 255, 0.08)',
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          subtle: 'rgba(59, 130, 246, 0.1)',
        },
        emerald: {
          DEFAULT: '#10b981',
          subtle: 'rgba(16, 185, 129, 0.12)',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-accent': '0 0 32px -8px rgba(59, 130, 246, 0.25)',
      }
    },
  },
  plugins: [],
};
