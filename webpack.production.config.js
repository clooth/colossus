var path = require('path')
var webpack = require('webpack')
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
})

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'client/src/main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: './client/dist/',
    filename: 'bundle.js'
  },
  plugins: [
    definePlugin,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [

      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client/src')
      },
    ]
  },
  node: {
    fs: 'empty'
  },
  externals: {
    'phaser': 'Phaser'
  }
}
