# ngscanner-backend
backend, nodejs, mongodb, mongoose, express, expressjs, Joi, JoiValidator, node

## This application is intended to be a core backend firmware to support traffic to another frontend site which I'm currently building ##

Used toolkits:

 * ExpressJS,
 * Joi
 * mongoose
 * mongodb
 * body-parser
 * bcrypt
 
### Developer's friend ###
* nodemon - Automatically detect changes. You won't have to restart your node application to test the new logic.

Save to dev dependency

npm:
``npm install --save-dev nodemon``

yarn:
``yarn add nodemon --dev``

 ### Uses ###
 
 *Joi* is a validator that supports and ensures the validation of information that is gathered from external source into mongodb. It controls the provided fields and ensures the fields are matching user's database policy.
 
 *ExpressJS* helps to build the initial HTTP routes which is otherwise redundant to do in raw NodeJS fashion.
 
 *mongodb* MongoDB driver for NodeJS
 
 *mongoose* is modelling library that manages relationships between information, provides schema validation, and is used to translate between objects in MongoDB.
 
 *body-parser* is a middleware which infuses the body portion of a request stream and displays it on req.body. Without this firmware, it would take several boiler-plate code to extract, confirm, index the information out of the request body.
 
 *bcrypt* is an authentication and password hashing security middleware which hashes user's password.

## NodeJS Installtion ##

[Download NodeJS for your platform](https://nodejs.org/en/download/) 


## Required tools to install ##


### If you are using npm, run the following code using a terminal. ###


body-parser
```
npm install body-parser
```

The original Joi package is deprecated. Use **@hapi/joi** instead
```
npm install @hapi/joi
```

expressJS
```
npm install express
```

mongodb
```
npm install mongodb
```

mongoose
```
npm install mongoose
```

bcrypt
```
npm install bcrypt
```

### If you are using yarn, run the following code using a terminal. ###

body-parser
```
yarn add body-parser
```

The original Joi package is deprecated. Use **@hapi/joi** instead
```
yarn add @hapi/joi
```

expressJS
```
yarn add express
```

mongodb
```
yarn add mongodb
```

mongoose
```
yarn add mongoose
```

bcrypt
```
yarn add bcrypt
```
