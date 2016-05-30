const path = require('path');

const config = require('../config');
const base = require('./base');

module.exports = Object.assign({}, base, config.nodeMixin, {
  entry: path.join(config.src, 'cmd', 'webserver'),

  output: {
    path: path.join(config.dist),
    filename: 'webserver.js',
    publicPath: '/',
  },
});
