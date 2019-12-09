const courseController = require('../../controllers').course;
const studentController = require('../../controllers').student;
const loginController = require('../../controllers').login;
const { setToken, verifyToken, isDean } = require('../middleware');

module.exports = app => {
  app.post(
    '/api/courses',
    setToken,
    verifyToken,
    isDean,
    courseController.create
  );
  app.delete(
    '/api/courses/:courseId',
    setToken,
    verifyToken,
    isDean,
    courseController.delete
  );
  app.put('/api/courses', setToken, verifyToken, isDean, courseController.put);
  app.get('/api/courses', setToken, verifyToken, isDean, courseController.list);
  app.post('/api/student', studentController.create);
  app.post('/api/course/student', studentController.enroll);
  app.post('/api/login', loginController.getToken);
};
