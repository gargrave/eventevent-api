const knex = require('../../../db');

module.exports = async({
  id,
  table,
}) =>
  knex(table)
    .returning('*')
    .where('id', id)
    .delete();
