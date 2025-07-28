import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111827', // Slate Black
        accent: '#F97316', // Vibrant Orange
        surface: '#F9FAFB', // Warm White
        'gradient-start': '#f3f4f6',
        'gradient-end': '#e5e7eb',
        'status-loading': '#60A5FA',
        'status-error': '#DC2626',
        'status-success': '#10B981',
        'focus': '#3B82F6',
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      transitionDuration: {
        'motion': '200ms',
      },
      transitionTimingFunction: {
        'motion': 'ease-in-out',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out forwards',
        'slide-in': 'slideIn 0.2s ease-in-out forwards',
        'fade-scale': 'fadeScale 0.15s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
export default config