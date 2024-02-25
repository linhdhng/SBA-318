
const express = require("express");
const mongoose = require('mongoose');

const db = require('./db/database');
const app = express();

const port = 5000;

// Middlewares
app.use(express.json());
// app.use(express.static('./styles'));

// const fs = require('fs');
// app.engine('page', (filePath, data, callback) => {
//     fs.readFile(filePath, (err, content) => {
//         if (err) return callback (err);

//         const rendered = content
//             .toString()
//             .replaceAll("#word#", `${data.word}`)
//             .replace("#translate#", `${data.translate}`);
//         return callback(null, rendered);
//     });
// });

//Create and render at least one view using a view template and template engine.
// app.set('views', './views')
// app.set('view engine', 'page');

//Routes
app.get('/', (req, res) => {
    const data = {
        word: "привет",
        translate: "hello",
    };

    res.send(data);
});

app.post('/translate', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Error handling
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});
app.use((err, req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});

// express.static(root,[options]) //[req.param]
//res.redirect('/redirect to a /location')
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

