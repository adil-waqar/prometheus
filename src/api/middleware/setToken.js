module.exports = (req, res, next) => {
  // Get the auth header
  const bearerHeader = req.headers['authorization'];
  // Check if the token is set
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res
      .status(403)
      .send({ message: 'This is a protected route, authorization needed.' });
  }
};
