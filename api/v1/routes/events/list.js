const { apiUrl } = require('../../config');
const { getOwnerId } = require('../../helpers');
const { listQuery } = require('../../queries');

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
