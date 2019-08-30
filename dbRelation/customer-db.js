const fs = require('fs');

const data = fs.readFileSync('config.json');

const raw = JSON.parse(data);

exports.custUrl = {
    "s_db": raw.customer[0].s_db,
    "s_client": raw.customer[1].s_client,
    "s_schedule": raw.customer[2].s_schedule,
    "s_company": raw.customer[3].s_company,
    "db": raw.customer[0].db,
    "client": raw.customer[1].client,
    "schedule": raw.customer[2].schedule,
    "company": raw.customer[3].company
};
