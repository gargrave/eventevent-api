const { apiUrl } = require('../../config');
const { getOwnerId } = require('../../helpers/common');
const { eventsSelectFields } = require('../../helpers/events');
const { listQuery } = require('../../queries');

module.exports = {
  method: 'GET',

  path: apiUrl('/events'),

  handler: async(request) => {
    const params = {
      orderBy: 'date',
      ownerId: getOwnerId(request),
      select: eventsSelectFields,
      table: 'events',
    };
    const queryResult = await listQuery(params);
    return { data: { events: queryResult } };
  },

  options: {
    description: 'Events -> List',
  },
};
