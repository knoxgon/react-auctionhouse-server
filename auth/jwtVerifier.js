const jwt = require('jsonwebtoken');
const secKey = require('../config').secret.key;

function tokenVerify(req, res, next) {
    let header = req.body.token || req.query.token || req.headers['authorization'];
    try {
        if (typeof header !== "undefined") {
            let token = header.split(' ')[1];
            jwt.verify(token, secKey, (err, auth) => {
                if (err)
                    return res.status(403).send({ message: "You are not authorized" });
                req.decoded = auth;
                next();
            });
        } else {
            return res.status(403).send({ message: "No token provided" });
        }
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = tokenVerify;
