const courseController = require('../../controllers').course;
const studentController = require('../../controllers').student;
const loginController = require('../../controllers').login;
const degreePlanController = require('../../controllers').degreePlan;
const ploProgramController = require('../../controllers').ploProgram;
const ploCourseController = require('../../controllers').ploCourse;
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
  app.get('/api/degree-plan/:programId', degreePlanController.retrieve);
  //3. Department view: Manage PLOs
  app.post('/api/program/plos', ploProgramController.create);
  //4. Department vieW: Course PLO mapping
  app.post('/api/program/courses-plos', ploCourseController.create);
  app.get('/api/courses-plos/:programId', ploCourseController.retrieve);
  // Dangling routes
  app.post('/api/student', studentController.create);
  app.post('/api/course/student', studentController.enroll);
  app.post('/api/login', loginController.getToken);
  app.get('*', (req, res) => {
    res
      .status(200)
      .send({ message: 'You have ended up in a catch all route!' });
  });
};
