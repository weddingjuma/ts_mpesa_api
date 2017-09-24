var webpack = require('webpack'),
    path = require('path'),
    yargs = require('yargs');
 
var libraryName = 'ts_mpesa_api',
    plugins = [],
    outputFile;
 
if (yargs.argv.p) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  outputFile = ts_mpesa_api + '.min.js';
} else {
  outputFile = ts_mpesa_api + '.js';
}
 
var config = {
  entry: [
    __dirname + '/src/ts_mpesa_api.ts'
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: outputFile,
    library: ts_mpesa_api,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
      { test: /\.tsx?$/, loader: 'tslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.tsx?$/, loader: 'ts', exclude: /node_modules/ }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: [ '', '.js', '.ts', '.jsx', '.tsx' ]
  },
  plugins: plugins,
 
  // Individual Plugin Options
  tslint: {
    emitErrors: true,
    failOnHint: true
  }
};
 
module.exports = config;