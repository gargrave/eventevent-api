const knex = require('../../../db');

module.exports = async({
  payload,
  table,
}) =>
  knex(table)
    .returning('*')
    .insert(payload);
