const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.verifyUser = (req, res, next) => {
    console.log('hello')
    const { username, password } = req.body;

    User.findOne({username})
    .then((user) => {
        if (user === null) return res.status(200).json({})
        res.locals.user = user;
        bcrypt.compare(password, user.password)
        .then(match => {
            console.log('match', match);
            return match ? next()
            : next({
                log: `Express error in userController.verifyUser: invalid password`,
                status: 400,
                message: { err: `An error occurred in userController.verifyUser: invalid password` }
            })
        })
        .catch(err => next({
                log: `Express error in userController.verifyUser: ${err}`,
                status: 400,
                message: { err: 'An error occurred in userController.verifyUser' },
        }))
    })
    .catch(err => next({
            log: `Express error in userController.verifyUser: ${err}`,
            status: 400,
            message: { err: 'An error occurred in userController.verifyUser' },
    }));
};


userController.addUser = (req, res, next) => {
    const { username, password } = req.body;

    User.create({ username, password })
    .then((user) => {
        res.locals.user = user;
        console.log('afsdfsdf')
        return next();
    })
    .catch(err => next({
        log: `Express middleware error in userController.createUser: ${err}`,
        status: 400,
        message: { err: 'An error occurred in userController.createUser' },
    }));
};

userController.deleteUser = (req, res, next) => {
    const { username } = req.body;
    console.log('username', username)

    User.deleteOne({username})
    .then(res => {
        console.log('res', res);
        return next();
    })
    .catch(err => next({}))
}

module.exports = userController;