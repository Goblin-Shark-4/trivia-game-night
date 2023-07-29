const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        // publicPath: ''
    },
    mode: process.env.NODE_ENV,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,    //1)massive folder 2)doesn't need to be transformed
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          }
        },
        {
            test: /\.s[ac]ss$/i,     ///also: /\.s[ac]ss$/i
            use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, './build'),
        publicPath: '/'
      },
      // compress: true, 
      port: 8080,
      proxy: {
        '/api': 'http://localhost:3000'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html'
    })],
  devtool: 'eval-source-map'
}