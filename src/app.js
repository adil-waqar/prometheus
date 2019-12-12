const express = require('express');
const { db } = require('./models');
const app = express();
const morgan = require('morgan');
const log = require('./logger');
const port = 1234;
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

try {
  require('./api/routes')(app);
} catch (error) {
  log.error(error);
}

// Starting up server
db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      log.debug('Server started on', port);
    });
  })
  .catch(err => {
    log.debug('Database sync failed with error:', err);
  });
