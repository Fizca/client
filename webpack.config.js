const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'local';
const isProduction = env === 'production';

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: 'vendors.bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  target: 'web',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'assets'),
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    hot: !isProduction,
    publicPath: '/',
  },
  module: {
    rules: [
      // Compile the JS files into a bundle
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
      },
      // Compile the CCSS files
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      // For all assets smaller than the limit, embed them in the bundle.js
      // Note: `file-loader` does the oposite. Keeps files as assets.
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/[contenthash].[ext]',
              limit: 8192,
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new webpack.ProvidePlugin ({
      React: 'react',
    }),
    new ManifestPlugin(),
    new webpack.DefinePlugin({

    })
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/ui/components'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@public': path.resolve(__dirname, 'public'),
    }
  }
}
