/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

exports.fonts = () => ({
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff2?)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5e4,
          },
        },
      },
    ],
  },
});

exports.html = ({
  template,
}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      template,
    }),
  ],
});

exports.js = ({
  include,
  exclude,
} = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'babel-loader',
      },
    ],
  },
});

exports.linting = ({
  include,
  exclude,
} = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'eslint-loader',
      },
    ],
  },
});

exports.styles = () => ({
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
});

exports.vue = ({
  include,
  exclude,
} = {}) => ({
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include,
        exclude,
        use: 'vue-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
});
