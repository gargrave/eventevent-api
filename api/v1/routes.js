/* eslint-disable prefer-template */
const fs = require('fs');

module.exports =
  () => {
    const cwd = __dirname;
    const dirs = fs
      .readdirSync(cwd)
      .filter(file => fs.lstatSync(`${cwd}/${file}`).isDirectory());

    return dirs.reduce((accum, val) => {
      const dir = `${cwd}/${val}`;
      return accum.concat(
        fs.readdirSync(dir).map(d => `${dir}/${d}`)
      );
    }, []);
  };
