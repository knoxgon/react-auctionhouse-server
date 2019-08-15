const secretKey = require('../config').secret.key;
const jwtToken = require('jsonwebtoken');

module.exports = function (username) {
  return jwtToken.sign(
    { user: username },
    secretKey,
    { expiresIn: '1d' });
}