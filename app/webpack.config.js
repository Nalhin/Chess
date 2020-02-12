const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


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
    contentBase: [
      path.join(__dirname, 'public'),
    ],
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
        loader: [{
          loader: 'babel-loader',
          options: {
            plugins: ['lodash'],
            presets: [['env', { modules: false, targets: { node: 4 } }]],
          },
        }, 'eslint-loader'],
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
      {
        test: [/\.(png|jpe?g|gif)$/i],
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          useRelativePath: true,
          outputPath: path.resolve('./public/assets/images'),
        },
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
      { from: path.resolve(__dirname, './public'), to: path.resolve(__dirname, './dist') },
    ]),
    new Dotenv(),
    new webpack.EnvironmentPlugin({ ...env }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false },
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
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
