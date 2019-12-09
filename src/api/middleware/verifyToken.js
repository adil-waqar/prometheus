const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Verify token and extract authorization data
  jwt.verify(req.token, 'prometheus', (err, user) => {
    if (err) res.status(403).send({ message: 'Invalid token' });
    else {
      req.user = user;
      next();
    }
  });
};
