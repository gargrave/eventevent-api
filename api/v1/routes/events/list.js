const { listQuery } = require('../../queries');
const { apiUrl } = require('../../config');

module.exports = {
  method: 'GET',
  path: apiUrl('/events'),
  handler: async() => {
    const result = await listQuery('events');
    return { data: { events: result } };
  },
  options: {
    description: 'Events -> List',
  },
};
