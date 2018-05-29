const { apiUrl } = require('../../config');
const { getOwnerId } = require('../../helpers/common');
const { registrationsSelectFields } = require('../../helpers/registrations');
const { listWithJoinQuery } = require('../../queries');

const parseEventData = queryResult =>
  queryResult.reduce((accum, value) =>
    accum.concat({
      id: value.registration_id,
      registered_at: value.registered_at,
      event: {
        id: value.event_id,
        title: value.event_title,
        date: value.event_date,
      },
    }), []);


module.exports = {
  method: 'GET',

  path: apiUrl('/registrations'),

  handler: async(request) => {
    const ownerId = getOwnerId(request);
    const params = {
      innerJoin: ['events', 'registrations.id', 'events.id'],
      orderBy: 'registrations.created_at',
      ownerId,
      select: registrationsSelectFields,
      table: 'registrations',
      where: { user_id: ownerId },
    };
    const queryResult = await listWithJoinQuery(params);
    return { data: { registrations: parseEventData(queryResult) } };
  },

  options: {
    description: 'Registrations -> List',
  },
};
