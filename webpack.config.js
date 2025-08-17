const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '',
  },
  devtool: isProduction ? false : 'inline-source-map',
  mode: isProduction ? 'production' : 'development',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      // JS/JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProduction
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                },
              }
            : 'style-loader', // HMR in dev
          {
            loader: 'css-loader',
            options: { url: true, sourceMap: !isProduction },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                  'postcss-preset-env',
                  isProduction ? 'cssnano' : false,
                ].filter(Boolean),
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }, // required by resolve-url-loader
          },
        ],
      },
      // Images
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/images/[name][ext]' },
      },
      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/fonts/[name][ext]' },
      },
      // HTML
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body', // ensures JS injected into body
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],

  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },

  devServer: {
    static: path.join(__dirname, 'src'),
    port: 8080,
    open: true,
    hot: true, // HMR enabled
    watchFiles: ['src/**/*'], // watch all source files
    historyApiFallback: true, // SPA routing
  },
};
