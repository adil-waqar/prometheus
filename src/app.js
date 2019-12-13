const log = require('./logger');
const express = require('express');
const { db } = require('./models');
const app = express();
const morgan = require('morgan');
require('dotenv').config();

try {
  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  require('./api/routes')(app);
} catch (error) {
  log.error(error);
}

// Starting up server
db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT, () => {
      log.debug('Server started on', process.env.PORT);
    });
  })
  .catch(err => {
    log.debug('Database sync failed with error:', err);
  });
