const service = require('../services/user-service')

module.exports.fetchUsers = async function (req, res, next) {
  await service.getUsers()
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.send(err)
    })
}

module.exports.fetchOneUser = async function (req, res, next) {
  await service.findUser(req.params.username)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(404).send(err)
    })
}

module.exports.removeOneUser = async function (req, res, next) {
  await service.delUser(req.params.username)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(404).send(err)
    })
}