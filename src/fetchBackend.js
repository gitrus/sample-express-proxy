import config from './config';
import FormData from 'form-data';

export default async function fetchBackend(method, url, body = null, options = {}) {
  const baseUrl = config.get('backend:url');

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    method,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(body instanceof FormData ? body.getHeaders() : {}),
    },
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
  });

  if (response.status >= 500) {
    throw new Error(`Server error ${url}`);
  }

  return response;
}
