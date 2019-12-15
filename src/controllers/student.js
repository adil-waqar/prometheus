const { Student } = require('../models').db;
const { OfferedCourse } = require('../models').db;

module.exports = {
  create(req, res) {
    return Student.create({
      id: req.body.id,
      name: req.body.name
    })
      .then(student => res.status(201).send(student))
      .catch(err => res.status(400).send(err));
  },
  enroll(req, res) {
    Student.findByPk(req.body.studentId).then(student => {
      if (!student) {
        return res.status(404).send({ message: 'Student not found' });
      }
      OfferedCourse.findOne({
        where: {
          courseId: req.body.courseId
        }
      }).then(course => {
        if (!course) {
          return res.status(404).send({ message: 'Course not found' });
        }
        student
          .addOfferedCourse(course)
          .then(studentCourse =>
            res.status(201).send({ message: studentCourse })
          )
          .catch(err => res.status(400).send({ message: err }));
      });
    });
  }
};
