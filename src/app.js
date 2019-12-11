const express = require('express');
const { db } = require('./models');
const app = express();
const morgan = require('morgan');
const log = require('./logger');
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

require('./api/routes')(app);
app.get('*', (req, res) => {
  res.status(200).send({ message: 'You have ended up in a catch all route!' });
});

// Starting up server
const port = 1234;

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
