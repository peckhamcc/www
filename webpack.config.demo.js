const webpack = require('webpack')
const config = require('./webpack.config.template.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': '"production"'
  }
}))
config.plugins.push(new UglifyJsPlugin())

module.exports = config
