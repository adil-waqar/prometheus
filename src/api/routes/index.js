const courseController = require('../../controllers').course;
const studentController = require('../../controllers').student;
const loginController = require('../../controllers').login;
const degreePlanController = require('../../controllers').degreePlan;
const ploProgramController = require('../../controllers').ploProgram;
const ploCourseController = require('../../controllers').ploCourse;
const { setToken, verifyToken, auth } = require('../middleware');
const semesterController = require('../../controllers').semester;
const assessmentsController = require('../../controllers').assessment;
const cloController = require('../../controllers').clo;
const cloPloController = require('../../controllers').cloPlo;
const ploController = require('../../controllers').plo;

module.exports = app => {
  // Auth route
  app.post('/api/login', loginController.getToken);
  // 1. Department view: Manage offered courses
  app.post(
    '/api/courses',
    setToken,
    verifyToken,
    auth.isDean,
    courseController.create
  );
  app.delete(
    '/api/courses/:courseId',
    setToken,
    verifyToken,
    auth.isDean,
    courseController.delete
  );
  app.put(
    '/api/courses',
    setToken,
    verifyToken,
    auth.isDean,
    courseController.put
  );
  app.get(
    '/api/courses',
    setToken,
    verifyToken,
    auth.isDean,
    courseController.list
  );
  // 2. Department view: Set degree plan and prereqs
  app.post(
    '/api/degree-plan',
    setToken,
    verifyToken,
    auth.isDean,
    degreePlanController.create
  );
  app.get(
    '/api/degree-plan/:programId',
    setToken,
    verifyToken,
    auth.isDean,
    degreePlanController.retrieve
  );
  //3. Department view: Manage PLOs
  app.post(
    '/api/program/plos',
    setToken,
    verifyToken,
    auth.isDean,
    ploProgramController.create
  );
  //4. Department vieW: Course PLO mapping
  app.post(
    '/api/program/courses-plos',
    setToken,
    verifyToken,
    auth.isDean,
    ploCourseController.create
  );
  app.get(
    '/api/courses-plos/:programId',
    setToken,
    verifyToken,
    auth.isDean,
    ploCourseController.retrieve
  );
  //5. Contoller Examination view: Manage offered semester
  app.delete(
    '/api/:term/:year',
    setToken,
    verifyToken,
    auth.isControllerExamination,
    semesterController.delete
  );
  app.put(
    '/api/:term/:year',
    setToken,
    verifyToken,
    auth.isControllerExamination,
    semesterController.put
  );
  app.post(
    '/api/term/year',
    setToken,
    verifyToken,
    auth.isControllerExamination,
    semesterController.create
  );
  app.get(
    '/api/term/year',
    setToken,
    verifyToken,
    auth.isControllerExamination,
    semesterController.list
  );
  app.post(
    '/api/term/year/courses',
    setToken,
    verifyToken,
    auth.isControllerExamination,
    semesterController.offerCourses
  );
  //7. Instructor View: Manage Course Assessments
  app.post(
    '/api/course/assessments',
    setToken,
    verifyToken,
    auth.isInstructor,
    assessmentsController.create
  );
  app.post(
    '/api/course/assessments/results',
    setToken,
    verifyToken,
    auth.isInstructor,
    assessmentsController.addResult
  );
  app.post(
    '/api/courses/:courseId/clos/assessments',
    setToken,
    verifyToken,
    auth.isInstructor,
    assessmentsController.createCloAssessment
  );

  app.post(
    '/api/courses/:courseId/clos/plos',
    setToken,
    verifyToken,
    auth.isInstructor,
    cloPloController.create
  );
  //8. Instructor view: Manage CLOs
  app.post(
    '/api/courses/:courseId/clos',
    setToken,
    verifyToken,
    auth.isInstructor,
    cloController.create
  );
  app.get(
    '/api/courses/:courseId/clos',
    setToken,
    verifyToken,
    auth.isInstructor,
    cloController.list
  );
  app.delete(
    '/api/courses/:courseId/clos',
    setToken,
    verifyToken,
    auth.isInstructor,
    cloController.delete
  );
  app.get(
    '/api/courses/:courseId/clo-assessments',
    setToken,
    verifyToken,
    auth.isInstructor,
    cloController.retrieveAssessments
  );
  app.delete(
    '/api/courses/:courseId/clos/:cloNo/assessment',
    setToken,
    verifyToken,
    auth.isInstructor,
    cloController.deleteAssessment
  );
  //9. Controller Examination View: Get PLO transcript
  app.post(
    '/api/programs/:programId/plos/calculate',
    setToken,
    verifyToken,
    auth.isControllerExamination,
    ploController.calculate
  );
  app.get(
    '/api/programs/:programId/plos/',
    setToken,
    verifyToken,
    auth.isControllerExamination,
    ploController.list
  );
  // Instructor
  app.get(
    '/api/courses/:courseId/results/:term/:year',
    setToken,
    verifyToken,
    auth.isInstructor,
    cloController.calculateResults
  );
  // Controller Examination
  app.post(
    '/api/programs/:programId/plos/calculate',
    setToken,
    verifyToken,
    auth.isControllerExamination,
    ploController.calculate
  );
  // Dangling routes
  app.post(
    '/api/student',
    setToken,
    verifyToken,
    auth.isControllerExamination,
    studentController.create
  );
  app.post(
    '/api/course/student',
    setToken,
    verifyToken,
    auth.isInstructor,
    studentController.enroll
  );
  app.all('*', (req, res) => {
    res.status(403).send({ message: 'Method not allowed' });
  });
};
