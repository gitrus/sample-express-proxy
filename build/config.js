const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

const nodeModulesDirectory = path.join(root, 'node_modules');
const nodeModulesExternals = fs.readdirSync(nodeModulesDirectory)
  .filter(name => name !== '.bin')
  .reduce((acc, name) => ( // eslint-disable-line
    acc[name] = `commonjs ${name}`, // eslint-disable-line
    acc
  ), {
    'source-map-support/register': 'commonjs source-map-support/register',
    'babel-core/polyfill': 'commonjs babel-core/polyfill',
  });

module.exports = {
  root,
  src,
  dist,

  dev: true,

  nodeMixin: {
    target: 'node',
    node: {
      console: false,
      process: false,
      global: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },

    externals: [nodeModulesExternals],
  },
};
