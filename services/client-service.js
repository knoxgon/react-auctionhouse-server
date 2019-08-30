const excludeFields_ = { password: 0, _id: 0, __v: 0 };
const excludeFields = { _id: 0, __v: 0 };

const clientModel = require('../models/client-model');

//We want to extract everything but password, id, and version
/*module.exports.getTheUser = async function (token) {
  return new Promise((resolve, reject) => {
    userModel.findOne({ $or: [{ email: token }, { username: token }] }, excludeFields, (err, result) => {
      if (err) return reject(err)
      return resolve(result)
    })
  })
}*/

//We want to extract everything but password, id, and version
/*module.exports.getUsers = async function () {
  return new Promise((resolve, reject) => {
    userModel.find({}, excludeFields, (err, result) => {
      if (err) return reject(err)
      return resolve(result)
    })
  })
}*/

//Find client based on the username or email
module.exports.findAndGetClient = async function (param) {
  return new Promise((resolve, reject) => {
    clientModel.findOne(
      { $or: [{ email: param }, { username: param }] },
      excludeFields, (err, fin) => {
        if (err) return reject(err)
        resolve(fin);
      }
    )
  });
}

//Delete user based on username or email
/*module.exports.delUser = async function (param) {
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
}*/
