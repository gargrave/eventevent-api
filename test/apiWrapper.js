const axios = require('axios');

const BASE = 'http://localhost:3001/api/v1';
const DEFAULT_HEADERS = { Accept: 'application/json' };

function buildReq(method, url, data = null, token = null) {
  const req = {
    method,
    headers: { ...DEFAULT_HEADERS },
    url: `${BASE}${url}`,
  };

  delete req.headers.authorization;
  if (data) req.data = data;
  if (token) {
    req.headers.authorization = token;
  }

  return req;
}

module.exports = {
  async get(url, token = null) {
    try {
      const req = buildReq('get', url, null, token);
      const res = await axios(req);
      return { data: res.data.data || [] };
    } catch (err) {
      const error = err.response.data.data
        ? err.response.data.data
        : { error: err.response.data };
      return { data: error };
    }
  },

  async post(url, payload, token = null) {
    try {
      const req = buildReq('post', url, payload, token);
      const res = await axios(req);
      return { data: res.data.data || [] };
    } catch (err) {
      const error = err.response.data.data
        ? err.response.data.data
        : { error: err.response.data };
      return { data: error };
    }
  },

  async put(url, payload, token = null) {
    try {
      const req = buildReq('put', url, payload, token);
      const res = await axios(req);
      return { data: res.data.data || [] };
    } catch (err) {
      const error = err.response.data.data
        ? err.response.data.data
        : { error: err.response.data };
      return { data: error };
    }
  },

  async patch(url, payload, token = null) {
    try {
      const req = buildReq('patch', url, payload, token);
      const res = await axios(req);
      return { data: res.data.data || [] };
    } catch (err) {
      const error = err.response.data.data
        ? err.response.data.data
        : { error: err.response.data };
      return { data: error };
    }
  },

  async del(url, token = null) {
    try {
      const req = buildReq('delete', url, null, token);
      const res = await axios(req);
      return { data: res.data.data || [] };
    } catch (err) {
      const error = err.response.data.data
        ? err.response.data.data
        : { error: err.response.data };
      return { data: error };
    }
  },
};
