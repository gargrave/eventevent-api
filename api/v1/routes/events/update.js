const Boom = require('boom');

const { detailQuery, updateQuery } = require('../../queries');
const { apiUrl } = require('../../config');
const { isValidUpdatePayload } = require('../../validators/events');

module.exports = {
  method: ['PUT', 'PATCH'],

  path: apiUrl('/events/{id}'),

  handler: async(request, h) => {
    const getParams = { id: request.params.id, table: 'events' };
    const getQueryResult = await detailQuery(getParams);
    const originalRecord = getQueryResult.record;

    const { payload } = request;
    const validation = isValidUpdatePayload({ ...originalRecord, ...payload });
    if (validation.error) {
      return h.response({
        data: {
          error: Boom.badRequest(validation.error).output.payload,
        },
      }).code(400);
    }

    const params = { id: request.params.id, payload, table: 'events' };
    const queryResult = await updateQuery(params);
    const { record, error } = queryResult;
    const response = error ? { error } : { event: record };
    const code = error ? error.statusCode : 200;
    return h.response({ data: response }).code(code);
  },

  options: {
    description: 'Events -> Update',
  },
};
