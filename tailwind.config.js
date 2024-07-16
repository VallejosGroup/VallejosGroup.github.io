module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
}