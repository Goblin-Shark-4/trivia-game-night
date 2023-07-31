const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const authController = {};


authController.verifyJwt = (req, res, next) => {
    console.log('verifyAuth')
    try {
        const auth = req.headers['authorization'];
        if (!auth) return next({
            log: `Express error in cookieController.verifyJWT: no JWT`,
            status: 401,
            message: { err: `An error occurred in cookieController.verifyJWT: no JWT` },
        })

        const jwtToken = auth.split(' ')[1];
        jwt.verify(jwtToken, process.env.JWT_KEY, async (err, user) => {
            if (err) return res.sendStatus(401);
            const { username } = user;
            console.log('user', user);
            const userData = await User.findOne({ username });
            console.log('userData', userData);
            res.locals.user = userData;
            return next();
        })
    } catch (err) {
        return next({});
    }
}

authController.setJwtToken = async (req, res, next) => {
    try {
        const { _id, username } = res.locals.user
        const payload = { _id, username }
        const secret = process.env.JWT_KEY;
        console.log('secret', secret)
        const jwtToken = await jwt.sign(payload, secret, {expiresIn: '1h'});
        console.log('im here', jwtToken)

        res.locals.secret = {
            jwtToken: jwtToken,
            user: {
                id: _id,
                username: username
            }
        }
        console.log('secret signed!', jwtToken)
        return next()
    } catch (err) {
        return next({

        })
    }
}

module.exports = authController;