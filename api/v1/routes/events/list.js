const { listQuery } = require('../../queries');
const { apiUrl } = require('../../config');

module.exports = {
  method: 'GET',

  path: apiUrl('/events'),

  handler: async() => {
    const params = { table: 'events' };
    const result = await listQuery(params);
    return { data: { events: result } };
  },

  options: {
    description: 'Events -> List',
  },
};
