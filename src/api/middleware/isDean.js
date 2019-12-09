module.exports = (req, res, next) => {
  if (req.user.employee.designation === 'Dean') next();
  else res.status(403).send({ message: 'Unauthorized access' });
};
