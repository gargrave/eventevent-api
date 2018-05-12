const env = require('../../env'); // eslint-disable-line
const knex = require('../../db');
const { verboseLog } = require('../../utils/logger');

const config = {
  directory: './db/migrations/',
  tableName: 'migrations',
};

knex.migrate.rollback(config)
  .then(() => {
    verboseLog('DB rollback successful!');
    process.exit(0);
  })
  .catch((err) => {
    verboseLog('DB rollback error!');
    verboseLog(err);
    process.exit(1);
  });

