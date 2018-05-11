const axios = require('axios');

const BASE = 'http://localhost:3001';

module.exports = {
  async get(url) {
    const res = await axios.get(`${BASE}${url}`);
    return res.data.data || [];
  },
};
