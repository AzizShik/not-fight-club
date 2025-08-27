const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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

  // mode: 'production',
  // optimization: {
  //   minimize: false,
  //   // Отключаем другие оптимизации
  //   splitChunks: false,
  //   runtimeChunk: false,
  //   usedExports: false,
  //   sideEffects: false,
  // },
  // devtool: 'source-map',

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
        test: /\.(png|jpe?g|gif|ico)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/images/[name][ext]' },
      },
      // Icons
      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/icons/[name][ext]' },
      },
      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/fonts/[name][ext]' },
      },
      // Sounds
      {
        test: /\.(mp3|wav|ogg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/sounds/[name][ext]'
        }
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

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/views',
          to: 'views',
          noErrorOnMissing: true,
        },
        {
          from: 'src/assets/images',
          to: 'assets/images',
          noErrorOnMissing: true,
        },
        {
          from: 'src/assets/icons',
          to: 'assets/icons',
          noErrorOnMissing: true,
        },
      ],
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
