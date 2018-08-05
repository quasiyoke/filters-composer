const path = require('path');

const merge = require('webpack-merge');

const parts = require('./config/webpack-parts');

const getAbsolutePath = dir => path.resolve(__dirname, dir);

const COMMON_CONFIG = merge([
  parts.fonts(),
  parts.html({
    template: getAbsolutePath('src/templates/template.ejs'),
  }),
  parts.js({
    exclude: /node_modules/,
  }),
  parts.linting(),
  parts.styles(),
  parts.vue(),
  {
    resolve: {
      alias: {
        '@': getAbsolutePath('src'),
      },
    },
  },
]);

const DEVELOPMENT_CONFIG = merge([
  COMMON_CONFIG,
  {
    mode: 'development',
    devServer: {
      historyApiFallback: true,
    },
  },
]);

const PRODUCTION_CONFIG = merge([
  COMMON_CONFIG,
  {
    mode: 'production',
  },
]);

module.exports = env => (env === 'development' ? DEVELOPMENT_CONFIG : PRODUCTION_CONFIG);
