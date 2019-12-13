const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // Verify token and extract authorization data
  jwt.verify(req.token, process.env.JWT_SECRET, (err, user) => {
    if (err) res.status(403).send({ message: 'Invalid token' });
    else {
      req.user = user;
      next();
    }
  });
};
