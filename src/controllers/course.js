const { Course } = require('../models').db;

module.exports = {
  create(req, res) {
    try {
      return Course.create({
        id: req.body.id,
        name: req.body.name,
        cch: req.body.cch
      })
        .then(course => {
          res.status(201).send(course);
        })
        .catch(err => res.status(400).send(err));
    } catch (error) {
      res.status(500).send({ error: error });
    }
  },
  delete(req, res) {
    try {
      return Course.findByPk(req.params.courseId).then(course => {
        if (!course)
          return res.status(404).send({
            message: 'Course not found'
          });
        return course.destroy().then(() => {
          res.status(204).send({
            message: 'Course deleted successfully'
          });
        });
      });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  },
  put(req, res) {
    try {
      return Course.findByPk(req.body.id).then(course => {
        if (!course)
          return res.status(404).send({
            message: 'Course not found'
          });
        return course
          .update({
            id: req.body.id || course.id,
            name: req.body.name || course.name,
            cch: req.body.cch || course.cch
          })
          .then(course => {
            res.status(200).send({ course });
          })
          .catch(error => res.status(400).send({ error }));
      });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  },
  list(req, res) {
    return Course.findAll()
      .then(courses => res.status(200).send(courses))
      .catch(error => res.status(400).send({ error }));
  }
};
