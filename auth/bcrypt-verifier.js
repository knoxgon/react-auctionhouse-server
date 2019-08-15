const bcrypt = require('bcrypt');

module.exports = function (providedPsw, originalPassword) {
  if (!bcrypt.compareSync(providedPsw, originalPassword)) {
    return false;
  }
  return true;
}