var express = require('express');
var route = express.Router();

route.get('/', (req, res, next) => {
    res.json({ code: 404, reason: 'Page not found' });
    next();
});

route.post('/', (req, res, next) => {
    res.json({ code: 404, reason: 'Page not found' });
    next();
});

route.delete('/', (req, res, next) => {
    res.json({ code: 404, reason: 'Page not found' });
    next();
});

module.exports = route;
