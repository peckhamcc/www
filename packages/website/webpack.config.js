const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const config = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    app: './src/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
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
    }),
    new FaviconsWebpackPlugin('./assets/pcc-avatar.png')
  ],
  module: {
    rules: [{
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
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel'
          ],
          presets: [
            ['@babel/preset-env', {
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
            }],
            '@babel/preset-react'
          ],

          env: {
            development: {
              plugins: [

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
      test: /\.jsx?$/,
      include: /node_modules/,
      use: ['react-hot-loader/webpack']
    }, {
      test: /\.(jpe?g|png)$/i,
      loader: 'responsive-loader',
      options: {
        adapter: require('responsive-loader/sharp')
      }
    }, {
      test: /\.(gif|svg)$/i,
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
  }
}

if (process.env.NODE_ENV === 'development') {
  let key
  let cert

  try {
    key = fs.readFileSync('/usr/local/etc/nginx/certs/dev.peckham.cc.key', 'utf8')
    cert = fs.readFileSync('/usr/local/etc/nginx/certs/dev.peckham.cc.crt', 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn('No certificates found')
      console.warn('Try creating dev.peckham.cc.key and dev.peckham.cc.crt under /usr/local/etc/nginx')
    } else {
      console.warn(error)
    }
  }

  config.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new LiveReloadPlugin({
      port: 0,
      appendScriptTag: true,
      key,
      cert
    })
  )

  config.devtool = 'source-map'
} else {
  config.output.filename = '[name]-[chunkhash].js'
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, 'reports', 'bundle-size.html'),
      openAnalyzer: false
    })
  )
  config.optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

            return `npm.${packageName.replace('@', '')}`
          }
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false
          }
        },
        parallel: true,
        cache: true,
        sourceMap: true
      })
    ]
  }
}

module.exports = config
