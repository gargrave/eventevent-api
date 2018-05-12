let knex = require('knex');

if (!knex.insert) {
  knex = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
  });
}

module.exports = knex;
