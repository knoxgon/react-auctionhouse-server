const excludeFields = { password: 0, _id: 0, __v: 0 };
const userModel = require('../models/user-model');

//We want to extract everything but password, id, and version
module.exports.getUsers = async function () {
  return new Promise((resolve, reject) => {
    userModel.find({}, excludeFields, (err, result) => {
      if (err) return reject(err)
      return resolve(result)
    })
  })
}

//Find user based on the username or email
module.exports.findUser = async function (param, _excludeFields) {
  return new Promise((resolve, reject) => {
    userModel.findOne(
      { $or: [{ email: param }, { username: param }] },
      _excludeFields, (err, fin) => {
        if (!fin) return reject({ "failure": "User not exists." });
        resolve(fin);
      }
    )
  });
}

//Delete user based on username or email
module.exports.delUser = async function (param) {
  return new Promise((resolve, reject) => {
    userModel.deleteOne({ $or: [{ username: param }, { email: param }] },
      (err, user) => {
        if (!err) {
          if (user.n == 0 && user.ok == 1 && user.deletedCount == 0) {
            reject({ message: 'No such user.' });
          } else {
            resolve({ message: 'Success' });
          }
        } else
          reject('Internal Error');
      });
  })
}
