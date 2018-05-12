/* eslint-disable no-console */
module.exports = {
  log(data) {
    let lines = data;
    if (!Array.isArray(lines)) {
      lines = [lines];
    }
    lines.forEach(line => console.log(`${line}`));
  },

  verboseLog(_data) {
    let lines = _data;
    if (!Array.isArray(lines)) {
      lines = [lines];
    }
    console.log('==============================================================');
    lines.forEach(line => console.log(`=  ${line}`));
    console.log('==============================================================');
  },
};
