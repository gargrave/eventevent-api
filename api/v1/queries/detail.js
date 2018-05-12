const knex = require('../../../db');

module.exports = async({
  id,
  table,
}) =>
  knex(table)
    .where('id', id);
