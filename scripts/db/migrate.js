const env = require('../../env'); // eslint-disable-line
const knex = require('../../db');
const { verboseLog } = require('../../utils/logger');

const config = {
  directory: './db/migrations/',
  tableName: 'migrations',
};

knex.migrate.latest(config)
  .then(() => {
    verboseLog('DB migration successful!');
    process.exit(0);
  })
  .catch((err) => {
    verboseLog(['DB migration error!', err]);
    process.exit(1);
  });

