const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
  
  console.log('In verifyToken');
  let token = req.headers.token;

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.decoded = decoded;
    next();
  });
}

module.exports = verifyToken;