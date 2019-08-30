const service = require('../services/client-service')

/*module.exports.fetchUsers = async function (req, res, next) {
  await service.getUsers()
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.send(err)
    })
}*/

module.exports.FetchClientFromToken = async function (req, res, next) {
  await service.findAndGetClient(req.decoded.user)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(403).send(err)
    })
}

module.exports.fetchClient = async function (req, res, next) {
  await service.findAndGetClient(req.params.username)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(403).send(err)
    })
}

/*module.exports.removeOneUser = async function (req, res, next) {
  await service.delUser(req.params.username)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(404).send(err)
    })
}*/
