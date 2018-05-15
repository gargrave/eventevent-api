const Boom = require('boom');

const { apiUrl } = require('../../config');
const { populateOwnerId } = require('../../helpers/common');
const { createQuery } = require('../../queries');
const { isValidPayload } = require('../../validators/events');

module.exports = {
  method: 'POST',

  path: apiUrl('/events'),

  handler: async(request, h) => {
    const { payload } = request;
    // payload.date = new Date(); // TODO: get a real date set up for this!
    // delete payload.date;
    const validation = isValidPayload(payload);
    if (validation.error) {
      return h.response({
        data: {
          error: Boom.badRequest(validation.error).output.payload,
        },
      }).code(400);
    }

    const params = { payload, table: 'events' };
    const queryResult = await createQuery(params);
    const { record, error } = queryResult;
    const response = error ? { error } : { event: record };
    const code = error ? error.statusCode : 201;
    return h.response({ data: response }).code(code);
  },

  options: {
    description: 'Events -> Create',
    pre: [
      { method: populateOwnerId, failAction: 'error' },
    ],
  },
};
