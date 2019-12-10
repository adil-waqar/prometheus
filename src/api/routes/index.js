const courseController = require('../../controllers').course;
const studentController = require('../../controllers').student;
const loginController = require('../../controllers').login;
const degreePlanController = require('../../controllers').degreePlan;
const { setToken, verifyToken, isDean } = require('../middleware');

module.exports = app => {
  // 1. Department view: Manage offered courses
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
  // 2. Department view: Set degree plan and prereqs
  app.post('/api/degree-plan', degreePlanController.create);
  // Dangling routes
  app.post('/api/student', studentController.create);
  app.post('/api/course/student', studentController.enroll);
  app.post('/api/login', loginController.getToken);
};
