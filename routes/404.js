var express = require('express');
var route = express.Router();

route.get('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.post('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.put('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.patch('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.delete('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.copy('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.link('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.unlink('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.purge('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.lock('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.unlock('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

route.propfind('/', (req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

module.exports = route;
