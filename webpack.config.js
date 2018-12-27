const webpack = require('webpack');
const path = require('path');

const isDebug = process.env.NODE_ENV === 'development';

const PATH = path.resolve(__dirname, 'src');
module.exports = {
  mode: isDebug ? 'development' : 'production',
  entry: [
    './src/index.js',
  ],
  output: {
    path: PATH,
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      appRoot: path.resolve(__dirname, 'src'),
      containers: path.resolve(__dirname, 'src/containers'),
      components: path.join(__dirname, 'src/components'),
      statics: path.join(__dirname, 'src/statics'),
      utils: path.join(__dirname, 'src/utils'),
      services: path.resolve(__dirname, 'src/services'),
    },
    extensions: ['.jsx', '.js', '.less', '*'],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: PATH,
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 9990,
    stats: 'errors-only',
    https: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/rlp')],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
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
