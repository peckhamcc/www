const webpack = require('webpack')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const config = require('./webpack.config.template.js')

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

config.devtool = 'source-map'

module.exports = config
