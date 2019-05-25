const fs = require('fs');

//Read db config file
const data = fs.readFileSync('config.json');

//Parse data
const rawData = JSON.parse(data);

//Get root link
const url = rawData.link.url + rawData.link.c_port;

exports.link = {
    "url": url,
    port: 27017,
};
