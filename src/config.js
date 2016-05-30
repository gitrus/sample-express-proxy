import nconf from 'nconf';
import path from 'path';

nconf.file({
  file: 'jordan.json',
  dir: __dirname,
  search: true,
});

nconf.defaults({
  secret: '7c5b358bd47b63ea11bc5ab8a147667108836900d6a4bfd42f4cf75c0e4fa5019c275919873a8c471ec82d1815c4ba6ed48886a4038bf6f062fd38364e8a967c',
  backend: {
    url: 'http://176.112.203.178:9003',
    uploadsTempDir: path.join(__dirname, 'uploads-temp'),
  },
});

export default nconf;
