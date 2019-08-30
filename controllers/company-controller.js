const service = require('../services/company-service')

/*module.exports.fetchUsers = async function (req, res, next) {
  await service.getUsers()
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.send(err)
    })
}*/

module.exports.FetchCompanyFromToken = async function (req, res, next) {
  await service.findAndGetCompany(req.decoded.email)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(403).send(err)
    })
}

module.exports.fetchCompany = async function (req, res, next) {
  await service.findAndGetCompany(req.params.email)
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
