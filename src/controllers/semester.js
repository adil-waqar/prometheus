const { Semester } = require('../models').db;
const { Course } = require('../models').db;
const { Employee } = require('../models').db;
const log = require('../logger');

module.exports = {
  create: async (req, res) => {
    try {
      const { term, year } = req.body;
      let semester = await Semester.create({
        term,
        year
      });
      log.info('Semester created');
      return res.status(200).send(semester);
    } catch (error) {
      log.error(error);
      return res
        .status(400)
        .send({ message: 'Unexpected error', error: error.message });
    }
  },
  offerCourses: async (req, res) => {
    try {
      log.info('Offering courses in progress');
      const { term, year, courses } = req.body;
      const semester = await Semester.findOne({
        where: {
          term,
          year
        }
      });
      if (!semester) {
        log.debug('Semester is not offered yet');
        return res.status(200).send({ message: 'Semester is not offered yet' });
      }
      const coursesFound = [];
      const coursesNotFound = [];
      const employeesFound = [];
      const employeesNotFound = [];

      for (let course of courses) {
        const courseInstance = await Course.findByPk(course.courseId);
        const employeeInstance = await Employee.findByPk(course.employeeId);
        if (!courseInstance) {
          coursesNotFound.push(course.courseId);
        } else {
          coursesFound.push(courseInstance);
        }
        if (!employeeInstance) employeesNotFound.push(course.employeeId);
        else employeesFound.push(course.employeeId);
      }
      if (
        coursesFound.length === courses.length &&
        employeesFound.length === courses.length
      ) {
        for (let [i, course] of coursesFound.entries()) {
          await semester.addCourse(course, {
            through: {
              employeeId: employeesFound[i],
              termId: semester.id
            }
          });
        }
        log.info('Courses have been offered in', term, year);
        return res
          .status(200)
          .send({ message: 'Courses have been offered in', term, year });
      } else {
        return res.status(404).send({
          message: 'Following courses/employees not found',
          courses: coursesNotFound,
          employees: employeesNotFound
        });
      }
    } catch (error) {
      log.error(error);
      return res.status(400).send({
        Message: 'An unexpected error occured while offering courses'
      });
    }
  },
  async delete(req, res) {
    try {
      let termVal = await Semester.findOne({
        where: {
          term: req.params.term,
          year: req.params.year
        }
      });
      if (!termVal) {
        log.info('Term does not exist');
        return res.status(400).send({
          message: 'term does not exist'
        });
      }
      let termdel = await termVal.destroy();
      log.info('Term deleted', termdel);
      return res.status(200).send(termdel);
    } catch (error) {
      log.error(error);
      return res.status(500).send({ error: error.name });
    }
  },
  async put(req, res) {
    try {
      let termVal = await Semester.findOne({
        where: {
          term: req.params.term,
          year: req.params.year
        }
      });
      if (!termVal) {
        log.info('Term does not exist');
        return res.status(400).send({
          message: 'term does not exist'
        });
      }
      let updateTerm = await termVal.update({
        term: req.body.term || termVal.term,
        year: req.body.year || termVal.year
      });
      if (!updateTerm) {
        log.info('Update not successful');
        return res.status(400).send({ message: 'Update not successful' });
      }
      log.info('Update successful');
      return res
        .status(200)
        .send({ message: 'Update done successfully', updateTerm });
    } catch (error) {
      log.error(error);
      return res.status(500).send({ error: error.name });
    }
  },
  async list(req, res) {
    try {
      let term = await Semester.findAll();
      if (!term) {
        log.debug('No term exists');
        return res.status(404).send({ message: 'No term exists' });
      }
      return res.status(200).send(term);
    } catch (error) {
      log.error(error);
      return res.status(500).send({ error: error.name });
    }
  }
};
