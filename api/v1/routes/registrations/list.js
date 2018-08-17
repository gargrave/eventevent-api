const Boom = require('boom');

const { apiUrl } = require('../../config');
const { getOwnerId } = require('../../helpers/common');
const { registrationsSelectFields } = require('../../helpers/registrations');
const { listWithJoinQuery } = require('../../queries');

const parseEventData = queryResult =>
  queryResult.reduce((accum, value) =>
    accum.concat({
      id: value.id,
      owner_id: value.owner_id,
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

  handler: async(request, h) => {
    const ownerId = getOwnerId(request);
    const params = {
      innerJoin: ['events', 'registrations.id', 'events.id'],
      orderBy: 'registrations.created_at',
      ownerId,
      select: registrationsSelectFields,
      table: 'registrations',
      where: { 'registrations.owner_id': ownerId },
    };

    try {
      const queryResult = await listWithJoinQuery(params);
      return { data: { registrations: parseEventData(queryResult) } };
    } catch (err) {
      console.log(err); // eslint-disable-line
      const error = Boom.internal().output.payload;
      return h.response({ data: { error } }).code(500);
    }
  },

  options: {
    description: 'Registrations -> List',
  },
};
