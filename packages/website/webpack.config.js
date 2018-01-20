const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {
  entry: {
    app: './src/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `'${process.env.NODE_ENV || 'production'}'`
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.template.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.jsx?$/,
      loaders: [{
        loader: 'babel-loader',
        options: {
          babelrc: false,
          plugins: [
            'transform-object-rest-spread',
            'transform-class-properties'
          ],
          presets: [
            'react',
            ['env', {
              targets: {
                browsers: [
                  'last 2 versions'
                ]
              },
              exclude: [
                'transform-regenerator'
              ],
              modules: false,
              loose: true
            }]
          ],

          env: {
            development: {
              plugins: [
                [
                  'react-transform', {
                    transforms: [{
                      'transform': 'react-transform-hmr',
                      'imports': ['react'],
                      'locals': ['module']
                    }, {
                      'transform': 'react-transform-catch-errors',
                      'imports': [
                        'react',
                        'redbox-react'
                      ]
                    }]
                  }]
              ]
            },
            production: {

            },
            test: {
              plugins: [
                ['istanbul']
              ]
            }
          }
        }
      }],
      exclude: /node_modules/
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file-loader?digest=hex&name=[name].[ext]',
        'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
      ]
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loaders: [
        'file-loader?name=fonts/[name]-[hash].[ext]'
      ]
    }, {
      test: /\.(wav|mp3)$/i,
      loaders: [
        'file-loader?name=[name]-bundle-[hash].[ext]'
      ]
    }, {
      test: /\.json$/,
      loaders: [
        'json-loader'
      ]
    }, {
      test: /\.(gpx|tcx)$/i,
      loaders: [
        'file-loader?name=[name]-bundle-[hash].[ext]'
      ]
    }]
  },
  devtool: 'source-map'
}

if (process.env.NODE_ENV === 'development') {
  config.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new LiveReloadPlugin({
      port: 35831,
      appendScriptTag: true,
      key: fs.readFileSync('/usr/local/etc/nginx/certs/dev.peckham.cc.key', 'utf8'),
      cert: fs.readFileSync('/usr/local/etc/nginx/certs/dev.peckham.cc.crt', 'utf8')
    })
  )

  config.devtool = 'source-map'
} else {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, 'reports', 'bundle-size.html'),
      openAnalyzer: false
    }),
    new UglifyJsPlugin()
  )
}

module.exports = config
