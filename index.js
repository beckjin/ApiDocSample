const express = require('express');
const app = express();
const fs = require("fs");

app.use('/', express.static('public'));

app.get('/getDocs', function (req, res) {
    let docFileInfos = [];
    let pathDir = __dirname + '/public/docs';
    try {
        let fileNames = fs.readdirSync(pathDir);
        fileNames.forEach(function (fileName) {
            let data = fs.readFileSync(pathDir + '/' + fileName, 'utf8');
            data = data.trim();
            let json = JSON.parse(data);
            docFileInfos.push({
                url: './docs/' + fileName,
                name: json.info.title
            });
        });
    } catch (err) {
        console.log(err);
    }
    res.send(docFileInfos);
});

app.listen(3000, function () {
    console.log('app listening on http://localhost:3000');
});