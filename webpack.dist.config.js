const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const PATH = path.resolve(__dirname, 'src')

const isDebug = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDebug ? 'development' : 'production',
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.[hash].js',
    chunkFilename: 'js/bundle.[name].js',
  },
  resolve: {
    alias: {
      appRoot: path.resolve(__dirname, 'src'),
      containers: path.resolve(__dirname, 'src/containers'),
      components: path.join(__dirname, 'src/components'),
      Statics: path.join(__dirname, 'src/statics'),
      utils: path.join(__dirname, 'src/utils'),
      Services: path.resolve(__dirname, 'src/services'),
    },
    extensions: ['.jsx', '.js', '.less', '*'],
  },
  // devtool: 'source-map',
  optimization: {
    // minimizer: [
    //   new UglifyJsPlugin({
    //     cache: true,
    //     parallel: true,
    //     sourceMap: true, // set to true if you want JS source maps,
    //     uglifyOptions: {
    //       ie8: false,
    //       ecma: 6,
    //       warnings: false,
    //       mangle: true, // debug false
    //       output: {
    //         comments: false,
    //         beautify: false, // debug true
    //       },
    //     },
    //   }),
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          warnings: false,
          parse: {},
          compress: {},
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'style',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的html存放路径，相对于`path`
      template: 'src/index-tpl.html', // html模板路径
      inject: true, // 允许插件修改哪些内容，包括head与body
      hash: true, // 为静态资源生成hash值
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/rlp')],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        include: path.resolve(__dirname, 'src/statics/images'),
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
