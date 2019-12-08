const courseController = require('../../controllers').course;
const studentController = require('../../controllers').student;

module.exports = app => {
  app.post('/api/course', courseController.create);
  app.post('/api/student', studentController.create);
  app.post('/api/course/student', studentController.enroll);
};