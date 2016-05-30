import 'source-map-support/register';
import 'babel-polyfill';

import { server } from '../app';

const port = Number(process.env.PORT || 3000);
const ip = process.env.IP || '0.0.0.0';

server.listen(port, ip, (err) => {
  if (err) {
    throw err;
  }

  console.log(`webserver listen ${port}`); // eslint-disable-line no-console
});
