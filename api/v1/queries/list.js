const knex = require('../../../db');

module.exports = async({
  table,
}) =>
  knex
    .select()
    .from(table);
