const agent = require('superagent');
const fs = require('fs');
const admZip = require('adm-zip');

const zipDownloadFolder = 'zip-downloads/';
const link = 'http://eforexcel.com/wp/wp-content/uploads/2017/07/';

const path = require('path');
const extractTo = zipDownloadFolder;
const zipFolder = path.join(__dirname, '../') + '/zip-downloads/';

module.exports = async function (req, res, next) {
    const zipName = req.query.zipName;
    if (!zipName) {
        return res.status(422).send({ error: "No zipName provided" });
    }

    const completeLink = link + zipName;

    return await agent
        .get(completeLink)
        .on('error', (err) => {
            return next(err);
        })
        .pipe(fs.createWriteStream(zipName))
        .on('finish', () => {
            //Init zip
            let zip = new admZip(zipName);
            zip.extractAllTo(extractTo, true);

            //Get extracted file name
            const fileName = zip.getEntries()[0].entryName;

            //Remove zip file
            fs.unlink(zipName, (err) => {
                if (err) return next(err);
            });

            //Send file
            return res.sendFile(zipFolder + fileName, () => {
                //Remove file
                fs.unlink(zipFolder + fileName, (err) => {
                    if (err) return next(err);
                });
            });
        })
};
