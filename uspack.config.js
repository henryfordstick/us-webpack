const path = require('path');
const ConsoleLogOnBuildWebpackPlugin = require('./plugins/ConsoleLogOnBuildWebpackPlugin');
module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'main.js',
  },
  plugins: [new ConsoleLogOnBuildWebpackPlugin()],
};