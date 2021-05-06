const jwt = require('jsonwebtoken');

// add new secret as env var
const secret = 'terceSgiB';
const expiration = '2h';

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ date: payload }, secret, { expiresIn: expiration });
  },
  authMiddleware: function ({ req }) {
    // allow token to be sent via req.body req.query or headers
    let token = req.headers.authorization || req.body.token || req.query.token;

    // separate "Bearer" from "<JWT value>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // no token present
    if (!token) {
      return req;
    }

    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } 
    catch {
      console.log('invalid token');
    }

    // return updated request object
  }
}