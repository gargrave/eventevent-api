const axios = require('axios');

const BASE = 'http://localhost:3001/api/v1';

module.exports = {
  async get(url) {
    try {
      const res = await axios.get(`${BASE}${url}`);
      return { data: res.data.data || [] };
    } catch (err) {
      return { data: err.response.data.data };
    }
  },

  async post(url, payload) {
    try {
      const res = await axios.post(`${BASE}${url}`, payload);
      return { data: res.data.data || [] };
    } catch (err) {
      return { data: err.response.data.data };
    }
  },

  async put(url, payload) {
    try {
      const res = await axios.put(`${BASE}${url}`, payload);
      return { data: res.data.data || [] };
    } catch (err) {
      return { data: err.response.data.data };
    }
  },

  async patch(url, payload) {
    try {
      const res = await axios.patch(`${BASE}${url}`, payload);
      return { data: res.data.data || [] };
    } catch (err) {
      return { data: err.response.data.data };
    }
  },

  async del(url) {
    try {
      const res = await axios.delete(`${BASE}${url}`);
      return { data: res.data.data || [] };
    } catch (err) {
      return { data: err.response.data.data };
    }
  },
};
