const { apiUrl } = require('../../config');
const { listQuery } = require('../../queries');
const { getOwnerId } = require('../../helpers');

module.exports = {
  method: 'GET',

  path: apiUrl('/events'),

  handler: async(request) => {
    const params = {
      ownerId: getOwnerId(request),
      table: 'events',
    };
    const result = await listQuery(params);
    return { data: { events: result } };
  },

  options: {
    description: 'Events -> List',
  },
};
