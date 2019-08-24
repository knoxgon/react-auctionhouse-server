const fs = require('fs');

const data = fs.readFileSync('config.json');

const raw = JSON.parse(data);

exports.inputUrl = {
  "s_clientInput": raw.cl_input[0].s_clientInput,
  "clientInput": raw.cl_input[0].clientInput
};