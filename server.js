
const express = require("express");
const mongoose = require('mongoose');
const card = require('./models/productModel');
const db = require('./db/database.js');
const app = express();

const port = 5000;

// Middlewares
app.use(express.json());
app.use(express.static('./styles'));

const fs = require('fs');
app.engine('page', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback (err);
        const rendered = content
            .toString()
            .replaceAll("#word#", `${options.word}`)
            .replace("#translate#", `${options.translate}`);
        return callback(null, rendered);
    });
});

//Create and render at least one view using a view template and template engine.
app.set('views', './views');
app.set('view engine', 'page');

//Routes
app.get('/', (req, res) => {
    const data = {
        word: "привет",
        pronunciation: "privet",
        translate: "hello",
    };

    res.render('index', data);
});

app.get('/beginner', async(req, res) => {
    try {
        const beginner = await card.find({});
        res.status(200).json(beginner);
    } catch (error) {
        res.status(500).send('Not Found')
    }
    })

app.get("/data/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const Card = await card.findById(id)
        res.status(200).json(Card);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
})

app.post('/new', async(req, res) => {
    try {
        const Card = await card.create(req.body);
        res.status(200).send(Card);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
});

app.put('/data/:id', async(req,res) => {
    try {
    const {id} = req.params;
    const Card = await card.findByIdAndUpdate(id, req.body);
    if(!Card) {
        return res.status(404).send(`Cannot find any card with ${_id}`);
    }
    const updatedCard = await card.findById(id)
    res.status(200).json(updatedCard);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
})

app.delete('/data/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const Card = await card.findByIdAndDelete(id);
        if(!card){
            return res.status(404).send({message: `Cannot find card with id: ${id}`});
        }
        res.status(200).send(Card);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found');
    };
})

// Error handling
app.use((err, req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});
// Querry parameter to filter data
// express.static(root,[options]) //[req.param]
//res.redirect('/redirect to a /location')
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

