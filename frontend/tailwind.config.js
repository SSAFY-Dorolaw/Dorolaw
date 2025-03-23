/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        p5: '#374151',
        p4: '#6b7280',
        p3: '#9ca3af',
        p2: '#d1d5db',
        p1: '#f3f4f6',

        y5: '#ffe000',
        y4: '#ffea55',
        y3: '#fff07f',
        y2: '#fff5a3',
        y1: '#fffad0',

        g5: '#333333',
        g4: '#4f4f4f',
        g3: '#8a8a8a',
        g2: '#d1d5db',
        g1: '#f3f4f6',
      },
    },
  },
  plugins: [],
};
