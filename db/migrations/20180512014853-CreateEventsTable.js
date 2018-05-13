/* eslint-disable no-unused-vars */
exports.up = (knex, Promise) =>
  knex.schema.createTable('events', (table) => {
    table.increments('id');

    table.integer('owner_id').notNullable();
    table.foreign('owner_id')
      .references('users.id')
      .onDelete('CASCADE');

    table.string('title').notNullable();
    table.dateTime('date').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists('events');
