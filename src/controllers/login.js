const { Employee } = require('../models').db;
const jwt = require('jsonwebtoken');

module.exports = {
  getToken(req, res) {
    return Employee.findByPk(req.body.id).then(employee => {
      if (!employee) {
        return res.status(404).send({ message: 'Employee not found' });
      }
      if (req.body.password === employee.password) {
        jwt.sign({ employee }, 'prometheus', (err, token) => {
          res.status(200).send({ token });
        });
      } else {
        return res.status(403).send({ message: 'Password is incorrect' });
      }
    });
  }
};
