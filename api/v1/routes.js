/* eslint-disable prefer-template */
const fs = require('fs');

// Dynamically builds HapiJS routes based on any files found with the sibling 'routes' directory
module.exports =
  () => {
    const routes = `${__dirname}/routes`;
    const dirs = fs
      .readdirSync(routes)
      .filter(file => fs.lstatSync(`${routes}/${file}`).isDirectory());

    return dirs.reduce((accum, val) => {
      const dir = `${routes}/${val}`;
      return accum.concat(
        fs.readdirSync(dir).map(d => `${dir}/${d}`)
      );
    }, []);
  };
