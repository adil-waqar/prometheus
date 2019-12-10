const bunyan = require('bunyan');
const level = 'debug';

const log = bunyan.createLogger({
  name: 'Prometheus',
  stream: process.stdout,
  level
});

module.exports = log;
