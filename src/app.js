const express = require('express');
const { db } = require('./models');
const app = express();
const morganBody = require('morgan-body');
const log = require('./logger');
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
morganBody(app);

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
    console.log(`Database sync failed with error: ${err}`);
  });
