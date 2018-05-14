const API = require('./apiWrapper');

module.exports = {
  async loginAs(user) {
    const loginRes = await API.post('/auth/login', user);
    return loginRes.data.user;
  },

  async findOwnedRecord(table, token) {
    const listQuery = await API.get(`/${table}`, token);
    const records = listQuery.data[table];
    return records[0];
  },
};
