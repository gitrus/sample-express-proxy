import nconf from 'nconf';
import path from 'path';

nconf.file({
  file: 'jordan.json',
  dir: __dirname,
  search: true,
});

nconf.defaults({
  backend: {
    url: 'http://0.0.0.0',
    uploadsTempDir: path.join(__dirname, 'uploads-temp'),
  },
});

export default nconf;
