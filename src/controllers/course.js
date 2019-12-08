const { Course } = require('../models').db;
// const models = require('../models');

module.exports = {
  create(req, res) {
    return Course.create({
      id: req.body.id,
      name: req.body.name,
      cch: req.body.cch
    })
      .then(course => {
        res.status(201).send(course);
      })
      .catch(err => res.status(400).send(err));
  }
};
