const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  context: path.join(__dirname, ''),
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel"},
      { test: /\.styl$/, exclude: /node_modules/, loader: "style!css!postcss!stylus"}
    ]
  },
  postcss: [autoprefixer]
}
