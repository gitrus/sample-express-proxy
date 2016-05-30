const webpack = require('webpack');
const forever = require('forever-monitor');
const express = require('express');
const proxyMiddleware = require('express-http-proxy');

const webserverConfig = require('./webpack.config');

const serverPort = Number(process.env.PORT || 3000);
const webserverPort = serverPort + 1;

function touchWebserver() {
  if (!touchWebserver.server) {
    touchWebserver.server = new forever.Monitor('./dist/webserver.js', {
      max: 1,
      env: {
        PORT: webserverPort,
      },
    });
    touchWebserver.server.start();
  } else {
    touchWebserver.server.restart();
  }
}

const webserverCompiler = webpack(webserverConfig);

webserverCompiler.watch(300, (err, stats) => {
  if (err) {
    throw err;
  }

  console.log(stats.toString()); // eslint-disable-line no-console
  touchWebserver();
});

const app = express();

app.use(proxyMiddleware(`localhost:${webserverPort}`, { limit: '10mb' }));

app.listen(serverPort);