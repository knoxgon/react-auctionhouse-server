const fs = require('fs');

const data = fs.readFileSync('config.json');

const raw = JSON.parse(data);

exports.custUrl = {
    "s_db": raw.customer[0].s_db,
    "s_user": raw.customer[1].s_user,
    "s_schedule": raw.customer[2].s_schedule,
    "db": raw.customer[0].db,
    "user": raw.customer[1].user,
    "schedule": raw.customer[2].schedule
};
