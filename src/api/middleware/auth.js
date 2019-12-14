module.exports = {
  isDean: (req, res, next) => {
    if (req.user.employee.designation === 'Dean') next();
    else res.status(403).send({ message: 'Unauthorized access' });
  },
  isInstructor: (req, res, next) => {
    if (req.user.employee.designation === 'Instructor') next();
    else res.status(403).send({ message: 'Unauthorized access' });
  },
  isControllerExamination: (req, res, next) => {
    if (req.user.employee.designation === 'Controller Examination') next();
    else res.status(403).send({ message: 'Unauthorized access' });
  }
};
