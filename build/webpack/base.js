const webpack = require('webpack');

const config = require('../config');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [config.src],
        loaders: ['babel-loader'],
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
    ],
  },

  debug: config.dev,

  devtool: config.dev ? 'cheap-module-source-map' : 'source-map',

  plugins: (() => {
    const plugins = [
      new webpack.ProvidePlugin({
        'fetch': 'isomorphic-fetch',
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        ),
      }),
    ];

    return plugins;
  })(),

  babel: {
    presets: ['es2015', 'stage-0'],
  },
};
