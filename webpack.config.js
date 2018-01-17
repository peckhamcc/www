const webpack = require('webpack')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const config = require('./webpack.config.template.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new LiveReloadPlugin({
    port: 35831,
    appendScriptTag: true
  })
)

config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': '"development"'
  }
}))

config.plugins.push(new UglifyJsPlugin({
  sourceMap: true
}))    

config.devtool = 'source-map'

module.exports = config
