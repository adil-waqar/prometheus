const express = require('express');
const logger = require('morgan');
const { db } = require('./models');
const app = express();

// Middlewares
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

require('./api/routes')(app);
app.get('*', (req, res) => {
  res.status(200).send({ message: 'You have ended up in a catch all route!' });
});

// Starting up server
const port = 1234;

db.sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  })
  .catch(err => {
    console.log(`Database sync failed with error: ${err}`);
  });
