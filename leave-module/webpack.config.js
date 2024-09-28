const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 3001,
  },
  output: {
    publicPath: 'http://localhost:3001/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-loader',
            options: {
              // Your loader options (if any)
              name: '[name].[hash].[ext]',
              outputPath: 'images/'

            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'leaveModule',
      filename: 'remoteEntry.js',
      exposes: {
        './LeaveComponent': './src/LeaveComponent', 
      },
      remotes: {
        host: 'host@http://localhost:3000/remoteEntry.js', // Reference to host app
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.3.1' },
        'redux': { singleton: true, eager: true, requiredVersion: '^5.0.1' },
        'react-redux': { singleton: true, eager: true, requiredVersion: '^9.1.2' }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
