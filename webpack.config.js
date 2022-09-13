/**
 * Created by zh on 2021/11/25.
 */
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'demo12/commonjs/index.js'),
  output: {
    path: path.resolve(__dirname, 'demo12/dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: /demo12/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd()
    })
  ]
};
