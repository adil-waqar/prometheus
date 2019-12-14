const bunyan = require('bunyan');
require('dotenv').config();

const log = bunyan.createLogger({
  name: 'Prometheus',
  stream: process.stdout,
  level: process.env.LOG_LEVEL
});

module.exports = log;
