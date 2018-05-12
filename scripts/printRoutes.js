/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const chalk = require('chalk');
const routes = require('../api/v1/routes');

// max lengths for each string type
// used for correctly aligning the output
const max = [0, 0];
const values = [];

const isValidRoute = r => !!r.method && !!r.path && !!r.handler;

routes().forEach((route) => {
  const r = require(route);
  if (isValidRoute(r)) {
    const m = Array.isArray(r.method)
      ? r.method.join(' | ').toUpperCase()
      : r.method.toUpperCase();
    const p = r.path;
    const d = r.options.description;
    values.push({ m, p, d });

    max[0] = Math.max(m.length, max[0]);
    max[1] = Math.max(p.length, max[1]);
  }
});

const h1 = ' Method ';
const h2 = ' Path ';
const h3 = ' Description ';
const ch1 = chalk.black.bgGreen(h1);
const ch2 = chalk.black.bgYellow(h2);
const ch3 = chalk.black.bgBlue(h3);
const spaceWidth = 7;

const pad = (str, len) => ' '.repeat((len - str.length) + spaceWidth);

const out = []
  .concat('')
  .concat(`${ch1}${pad(h1, max[0])}${ch2}${pad(h2, max[1])}${ch3}`)
  .concat(values.map(
    v => `${v.m}${pad(v.m, max[0])}${v.p}${pad(v.p, max[1])}${v.d}`
  ))
  .concat('');

console.log(out.join('\n')); // eslint-disable-line
