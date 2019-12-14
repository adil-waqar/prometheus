const log = require('../logger');
const { Course } = require('../models').db;
const { Clo } = require('../models').db;

module.exports = {
  async create(req, res) {
    try {
      const courseId = req.params.courseId;
      const clos = req.body.clos;
      let course = await Course.findByPk(courseId);
      if (!course) return res.status(404).send({ message: 'Course not found' });
      for (let clo of clos) {
        await Clo.create({
          no: clo,
          courseId: course.id
        });
      }
      log.info('CLOs have been added to course');
      return res
        .status(201)
        .send({ message: 'CLOs have been added to course' });
    } catch (error) {
      log.error(error);
      res.status(400).send({ message: 'Unexpected error occured' });
    }
  }
};
