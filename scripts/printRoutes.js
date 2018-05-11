/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const chalk = require('chalk');
const routes = require('../api/routes');

const h1 = chalk.black.bgGreen('Method');
const h2 = chalk.black.bgYellow('Path');
const h3 = chalk.black.bgBlue('Description');
const out = ['', `${h1}\t\t${h2}\t\t\t${h3}`];

routes('../api').forEach((route) => {
  const r = require(route);
  const m = r.method.toUpperCase();
  const p = r.path;
  const d = r.options.description;

  out.push(`${m}\t\t${p}\t\t\t${d}`);
});
out.push('');

console.log(out.join('\n')); // eslint-disable-line
