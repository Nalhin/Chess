const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = env => ({
  mode: env.development ? 'development' : 'production',
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    publicPath: env.development ? '/' : '',
    filename: 'static/bundle.[hash].js',
    chunkFilename: 'static/chunk.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: env.development && 'eval-source-map',
  devServer: {
    contentBase: [path.join(__dirname, 'public')],
    hot: true,
    open: false,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: [/\.js$/],
        exclude: [/node_modules/, /test/],
        loader: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /\.test.(ts|tsx)/, /test/],
        loader: ['babel-loader', 'ts-loader'],
      },
      {
        test: [/\.(scss|css)$/],
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css',
      chunkFilename: 'chunk.[chunkhash].css',
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, './public'),
        to: path.resolve(__dirname, './dist'),
      },
    ]),
    new Dotenv(),
    new webpack.EnvironmentPlugin({ ...env }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: false,
      statsOptions: { source: false },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
});
