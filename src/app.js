import { Server } from 'http';
import fs from 'fs';
import config from './config';
import express from 'express';
import doRequest from 'request';
import bodyParser from 'body-parser';
import formidable from 'formidable';
import { createDecipher } from 'crypto';
import * as util from './utils';

import template from './template';
import createUserFetchBackend from './createUserFetchBackend';

export const app = express();
export const server = new Server(app);

function errorChecking(routeHandler) {
  return async function (req, res, next) {
    try {
      await routeHandler(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

if (process.env.PUBLIC_DIR) {
  app.use(express.static(process.env.PUBLIC_DIR));
}

if (!fs.existsSync(config.get('backend:uploadsTempDir'))) {
  fs.mkdirSync(config.get('backend:uploadsTempDir'));
}

app.use((request, response, next) => {
  if (request.method !== 'POST') {
    return next();
  }

  if (!/^multipart\/form-data/.test(request.get('Content-Type'))) {
    return next();
  }

  const form = new formidable.IncomingForm({
    hash: 'sha1',
    uploadDir: config.get('backend:uploadsTempDir'),
  });

  form.parse(request, (err, body, files) => {
    if (err) {
      return next(err);
    }

    request.body = body;
    request.files = files;
    next();
  });
});

app.use('/data', bodyParser.json());

app.use('/data', errorChecking(async (req, res) => {
  let token;

  if (req.headers['x-auth-token']) {
    token = req.headers['x-auth-token'];
  }

  const fetchBackend = createUserFetchBackend(token);


  const filtersMap = {
    state: {type: 'string', ignoreEmpty: true},
    dateFrom: {type: 'isoDate', name: 'createdFrom', ignoreEmpty: true},
    dateTo: {type: 'isoDate', name: 'createdTo', ignoreEmpty: true},
  };

  const params = util.mapQuery(req.query, filtersMap, true);
  const url = `/api${req.path}${params ? `?${params}` : ''}`;

  const backendResponse = await fetchBackend(req.method, url, req.body);

  await util.handleErrors(
    backendResponse,
    `${backendResponse.status} on ${req.originalUrl}`
  );

  res.send({ data: await backendResponse.json() });
}));

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

app.get('/files/:key/*', (req, res) => {
  const decipher = createDecipher('aes-256-cbc', new Buffer(config.get('secret'), 'utf8'));
  const orig = Buffer.concat([
    decipher.update(new Buffer(req.params.key, 'base64')),
    decipher.final(),
  ]).toString('utf8');

  const { fileId, token } = JSON.parse(orig);

  doRequest({
    method: 'GET',
    uri: `${config.get('backend:url')}/api/files/${fileId}`,
    headers: {
      'X-Auth-Token': token,
    },
  }).pipe(res);
});

app.get('*', (req, res) => {
  res.send(template());
});