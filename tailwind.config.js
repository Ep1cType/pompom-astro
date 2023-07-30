/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gold: '#D6AD76',
        violet: '#75459F',
        imaginary: '#F3DF32',
        three: {
          from: '#4981C6',
          to: '#3D3E69',
        },
        four: {
          from: '#9C65D7',
          to: '#3F4064',
        },
        five: {
          from: '#D0AA6E',
          to: '#A35D55',
        },
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}