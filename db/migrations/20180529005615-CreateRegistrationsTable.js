/* eslint-disable no-unused-vars */
const tables = require('../tables');

exports.up = (knex, Promise) =>
  knex.schema.createTable(tables.registrations, (table) => {
    table.increments('id');

    table.integer('user_id').notNullable();
    table.foreign('user_id')
      .references(`${tables.users}.id`)
      .onDelete('CASCADE');

    table.integer('event_id').notNullable();
    table.foreign('event_id')
      .references(`${tables.events}.id`)
      .onDelete('CASCADE');

    table.timestamps(true, true);

    table.unique(['user_id', 'event_id']);
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists(tables.registrations);
