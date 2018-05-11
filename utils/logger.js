/* eslint-disable no-console */
module.exports = {
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
