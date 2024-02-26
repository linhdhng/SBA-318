
const express = require("express");
const mongoose = require('mongoose');
const card = require('./models/productModel');
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
        pronunciation: "privet",
        translate: "hello",
    };

    res.send(data);
});

app.get('/data', async(req, res) => {
    try {
        const Card = await card.find({});
        res.status(200).json(Card);
    } catch (error) {
        res.status(500).send('Not Found')
    }
})

app.post('/translate', async(req, res) => {
    try {
        const Card = await card.create(req.body);
        res.status(200).send(Card);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
});

app.patch('translate/:id', async(req,res) => {
    const {id} = req.params;
    const Card = await Card.findByIdAndUpdate(id, req.body);
    if(!Card) {
        return res.status(400).send(`Cannot find any card with ${id}`);
    }

    res.status(200).json(Card);
})

// Error handling
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});
app.use((err, req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});
// Querry parameter to filter data
// express.static(root,[options]) //[req.param]
//res.redirect('/redirect to a /location')
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

