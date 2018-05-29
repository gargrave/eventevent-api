const knex = require('../../../db');

module.exports = async({
  innerJoin,
  orderBy = 'created_at',
  orderByDir = 'asc',
  ownerId,
  select = '*',
  table,
  where,
}) =>
  knex
    .select(select)
    .from(table)
    .innerJoin(...innerJoin)
    .where(where || { owner_id: ownerId })
    .orderBy(orderBy, orderByDir);
