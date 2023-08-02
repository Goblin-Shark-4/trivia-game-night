const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // verify that user exists in DB
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(200);
    res.locals.user = user;

    // verify that password is valid using bcrypt
    const match = await bcrypt.compare(password, user.password);
    return match
      ? next()
      : next({
          log: `Express error handler caught an error at userController.verifyUser: ${err}`,
          message: {
            err: 'An error occurred with verifying your credentials.',
          },
        });
  } catch (err) {
    return next({
      log: `Express error handler caught an error at userController.verifyUser: ${err}`,
      message: { err: 'An error occurred with verifying your credentials.' },
    });
  }
};

userController.addUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // create user in DB
    const user = await User.create({ username, password });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught an error at userController.addUser: ${err}`,
      message: { err: 'An error occurred with signing you up.' },
    });
  }
};

userController.deleteUser = async (req, res, next) => {
  const { username } = req.body;
  try {
    // delete user from DB
    const deletedUser = await User.deleteOne({ username });

    // if user exists in DB, send success message
    // otherwise, send failure message
    if (deletedUser.deletedCount === 0)
      res.locals.deleteMessage = `We could not find a user with the username ${username}.`;
    else res.locals.deleteMessage = 'You successfully deleted your account.';
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught an error at userController.deleteUser: ${err}`,
      message: { err: 'An error occurred with deleting your account.' },
    });
  }
};

module.exports = userController;
