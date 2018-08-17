const tables = require('../../../db/tables');

module.exports = {
  registrationsSelectFields: [
    `${tables.registrations}.id`,
    `${tables.registrations}.owner_id`,
    `${tables.registrations}.event_id`,
    `${tables.registrations}.created_at as registered_at`,
    `${tables.events}.title as event_title`,
    `${tables.events}.date as event_date`,
  ],
};
