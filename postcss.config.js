// postcss.config.js

module.exports = {
    parser: 'postcss-scss',
    plugins: [
      require('postcss-import'),
      require('tailwindcss'),
      require('autoprefixer'),
      require('cssnano'),
    ]
  }