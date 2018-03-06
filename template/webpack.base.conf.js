const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const baseConfig = {
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': resolve('/src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader'
              }),
              less: ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader'],
                fallback: 'vue-style-loader'
              })
            }
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader'
        })
      }
    ]
  },
}

module.exports = baseConfig;