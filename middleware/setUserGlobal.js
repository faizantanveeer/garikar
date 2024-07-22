const jwt = require('jsonwebtoken');

const setUserGlobal = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = verified;
        } catch (err) {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }

    next();
};

module.exports = setUserGlobal;
