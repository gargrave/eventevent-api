const Boom = require('boom');
const knex = require('../../../db');

module.exports = async({
  payload,
  table,
}) => {
  const res = { error: null, record: null };
  try {
    const queryRes = await knex(table)
      .returning('*')
      .insert(payload);
    res.record = queryRes[0]; // eslint-disable-line
  } catch (err) {
    res.error = Boom.badRequest().output.payload;
  }

  return res;
};
