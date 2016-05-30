import fetchBackend from './fetchBackend';

export default function createUserFetchBackend(token) {
  return (method, url, body = null, options = {}) => {
    if (token) {
      if (!options.headers) {
        options.headers = {};
      }

      options.headers['x-auth-token'] = token;
    }

    return fetchBackend(method, url, body, options);
  };
}
