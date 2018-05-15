const Boom = require('boom');

const knex = require('../../../db');
const { cleanErrorMessage } = require('../errorParser');

module.exports = async({
  payload,
  returning = '*',
  table,
}) => {
  const res = { error: null, record: null };

  try {
    const queryRes = await knex(table)
      .returning(returning)
      .insert(payload);
    res.record = queryRes[0]; // eslint-disable-line
  } catch (err) {
    res.error = Boom.badRequest(cleanErrorMessage(err)).output.payload;
  }

  return res;
};
