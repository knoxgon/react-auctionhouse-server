const client_service = require('../services/client-service')
const company_service = require('../services/company-service')
const bcryptor = require('../auth/bcrypt-verifier')
const token_signer = require('../auth/token-signer')

/*{
    {
      "firstName": "Billy",
      "lastName": "Jones",
      "email": "neutro_patrol@ssu.menningrad.co.uk",
      "username": "aritros200x",
      "password": "deimyaloaritmet4fa7@",
      "address": "new york wall street 17 Backstreet NY",
      "birthdate": "1956-12-06"
    },
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john_doe@hotmail.com",
      "username": "jd1995",
      "password": "#@589142fa9",
      "address": "journal avenue 74 CA",
      "birthdate": "1975-05-19"
    }
}*/

module.exports.client_controller = async function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'Username and password fields are required.' })
  }
  await client_service.findAndGetClient(req.body.username)
    .then((result) => {
      if (!bcryptor(req.body.password, result.password)) {
        return res.status(400).send({ message: "Wrong password" })
      }
      const token = token_signer(result.username)
      res.send({ token: token });
    }).catch((err) => {
      res.status(400).send({message: "User not found"})
    });
}

module.exports.company_controller = async function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and password fields are required.' })
  }
  await company_service.findAndGetCompany(req.body.email)
    .then((result) => {
      if (!bcryptor(req.body.password, result.password)) {
        return res.status(400).send({ message: "Wrong password" })
      }
      const token = token_signer(result.username)
      res.send({ token: token });
    }).catch((err) => {
      res.status(400).send({message: 'User not found'})
    });
}