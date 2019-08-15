const service = require('../services/user-service')
const bcryptor = require('../auth/bcrypt-verifier')
const token_signer = require('../auth/token-signer')

/*{
  "firstName": "Billy",
  "lastName": "Jones",
  "email": "neutro_patrol@ssu.menningrad.co.uk",
  "username": "aritros200x",
  "password": "deimyaloaritmet4fa7@"
}*/

module.exports = async function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'Username and password fields are required.' })
  }
  await service.findUser(req.body.username, { _id: 0, __v: 0 })
    .then((result) => {
      if (!bcryptor(req.body.password, result.password)) {
        return res.status(400).send({ message: "Wrong password" })
      }
      const token = token_signer(result.username)
      res.send({ token: token });
    }).catch((err) => {
      res.status(404).send(err)
    });
}