const Boom = require('boom');

const { apiUrl } = require('../../config');
const { getOwnerId } = require('../../helpers/common');
const { detailQuery, updateQuery } = require('../../queries');
const { isValidUpdatePayload } = require('../../validators/events');

module.exports = {
  method: ['PUT', 'PATCH'],

  path: apiUrl('/events/{id}'),

  handler: async(request, h) => {
    const ownerId = getOwnerId(request);
    const getParams = {
      id: request.params.id,
      ownerId,
      table: 'events',
    };
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

    // TODO: need to update the 'updated_at' field to NOW()
    const params = {
      id: request.params.id,
      ownerId,
      payload,
      table: 'events',
    };
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
