var express = require('express');
var route = express.Router();

route.get('/', (req, res, next) => {
    res.json({code: 404, reason: 'Page not valid'});
});

route.post('/', (req, res, next) => {
    res.json({code: 404, reason: 'Page not valid'});
});

module.exports = route;
