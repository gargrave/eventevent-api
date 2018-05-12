const env = require('../../env'); // eslint-disable-line
const knex = require('../../db');
const { verboseLog } = require('../../utils/logger');

const config = {
  directory: './db/seeds/',
};

// ensure that we are in 'dev' or 'test' environment; otherwise, do not seed!
const canSeed = ['test', 'development'].includes(process.env.NODE_ENV);
if (!canSeed) {
  verboseLog([
    'DB seeding can only proceed in "development" and "test" environments.',
    'Nothing will be done.',
  ]);
  process.exit(0);
}

knex.seed.run(config)
  .then(() => {
    verboseLog('DB seeding successful!');
    process.exit(0);
  })
  .catch((err) => {
    verboseLog(['DB seeding error!', err]);
    verboseLog(err);
    process.exit(1);
  });
