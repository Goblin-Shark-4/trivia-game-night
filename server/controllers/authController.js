const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authController = {};

// middleware: verify JWT
authController.verifyJwt = (req, res, next) => {
  try {
    const auth = req.headers['authorization'];
    if (!auth)
      return next({
        log: `Express error handler caught an error at authController.verifyJwt: ${err}`,
        status: 401,
        message: {
          err: `Error: JWT not found.`,
        },
      });

    const jwtToken = auth.split(' ')[1];
    jwt.verify(jwtToken, process.env.JWT_KEY, async (err, user) => {
      if (err)
        return next({
          log: `Express error handler caught an error at authController.verifyJwt: ${err}`,
          status: 401,
          message: {
            err: `Error: JWT not found.`,
          },
        });

      // confirm that user exists in DB
      const { username } = user;
      const userData = await User.findOne({ username });
      res.locals.user = userData;
      return next();
    });
  } catch (err) {
    return next({
      log: `Express error handler caught an error at authController.verifyJwt: ${err}`,
    });
  }
};

// middleware: set JWT token
authController.setJwtToken = async (req, res, next) => {
  try {
    // assign JWT token to user
    const { _id, username } = res.locals.user;
    const payload = { _id, username };
    const secret = process.env.JWT_KEY;
    const jwtToken = await jwt.sign(payload, secret, { expiresIn: '1h' });

    res.locals.secret = {
      jwtToken: jwtToken,
      user: {
        id: _id,
        username: username,
      },
    };
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught an error at authController.setJwtToken: ${err}`,
    });
  }
};

module.exports = authController;
