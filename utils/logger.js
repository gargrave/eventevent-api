/* eslint-disable no-console */
function log(data) {
  let lines = data;
  if (!Array.isArray(lines)) {
    lines = [lines];
  }
  lines.forEach(line => console.log(`${line}`));
}

function verboseLog(data, devOnly = false) {
  if (devOnly && process.env.NODE_ENV !== 'development') {
    return;
  }
  const lines = Array.isArray(data) ? data : [data];
  const out = [];
  out.push('='.repeat(62));
  lines.forEach(line => out.push(`= ${line}`));
  out.push('='.repeat(62));
  console.log(out.join('\n'));
}

function verboseLogDev(data) {
  verboseLog(data, true);
}

module.exports = {
  log,
  verboseLog,
  verboseLogDev,
};
