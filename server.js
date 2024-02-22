const { error } = require("console");
const express = require("express");

const app = express();

const port = 3000;

app.use(express.static('./styles'));

const fs = require('fs');

app.engine('frontend', (filePath, data, callback) => {
    fs.readFile(filePath, (error, content) => {
        if (error) return callback (error);

        const rendered = content
            .toString()
            .replaceAll("#Front#", `${data.word}`)
            .replace("#Back#", `${data.translate}`);
        return callback(null, rendered);
    });
});

app.set('view', './view');
app.set('view engine', 'frontend')

app.get('/', (req, res) => {
    const data = {
        word: "привет",
        translate: "hello",
    };
    res.render("index", data);
});

// express.static(root,[options]) //[req.param]
//res.redirect('/redirect to a /location')
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});