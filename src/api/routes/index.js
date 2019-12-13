const courseController = require('../../controllers').course;
const studentController = require('../../controllers').student;
const loginController = require('../../controllers').login;
const degreePlanController = require('../../controllers').degreePlan;
const ploProgramController = require('../../controllers').ploProgram;
const ploCourseController = require('../../controllers').ploCourse;
const { setToken, verifyToken, isDean } = require('../middleware');
const semesterController = require('../../controllers').semester;
const assessmentsController = require('../../controllers').assessment;
module.exports = app => {
  // Auth route
  app.post('/api/login', loginController.getToken);
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
  app.get('/api/courses', courseController.list);
  // 2. Department view: Set degree plan and prereqs
  app.post(
    '/api/degree-plan',
    setToken,
    verifyToken,
    isDean,
    degreePlanController.create
  );
  app.get(
    '/api/degree-plan/:programId',
    setToken,
    verifyToken,
    isDean,
    degreePlanController.retrieve
  );
  //3. Department view: Manage PLOs
  app.post(
    '/api/program/plos',
    setToken,
    verifyToken,
    isDean,
    ploProgramController.create
  );
  //4. Department vieW: Course PLO mapping
  app.post(
    '/api/program/courses-plos',
    setToken,
    verifyToken,
    isDean,
    ploCourseController.create
  );
  app.post('/api/program/courses-plos', ploCourseController.create);
  app.get('/api/courses-plos/:programId', ploCourseController.retrieve);
  //5. Contoller Examination view: Manage offered semester
  app.post('/api/term/year', semesterController.create);
  app.post('/api/term/year/courses', semesterController.offerCourses);
  //7. Instructor View: Manage Course Assessments
  app.post('/api/course/assessments', assessmentsController.create);
  app.post('/api/course/assessments/results', assessmentsController.addResult);
  // Dangling routes
  app.post('/api/student', studentController.create);
  app.post('/api/course/student', studentController.enroll);
  app.get('*', (req, res) => {
    res.status(403).send({ message: 'Method not allowed' });
  });
};
