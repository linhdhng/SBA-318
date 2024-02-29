
const express = require("express");
const mongoose = require('mongoose');
const card = require('./models/beginnerModel');
const dotenv = require('dotenv');
const intermediateRoute = require('./routes/intermediate');
// const advancedRoute = require('./routes/advanced');

dotenv.config();
const app = express();

const port = process.env.port || 5000;

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB!');
        }).catch((error) => {
            console.log(error);
        });

// Middlewares
app.use(express.json());
// Use simple CSS to style the rendered views.
app.use(express.static("./styles"));

//Create and render at least one view using a view template and template engine.
const fs = require('fs');
app.engine('page', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback (err);
        const rendered = content
            .toString()
            .replaceAll("#word#", `${options.word}`)
            .replace("#pronunciation#", `${options.pronunciation}` )
            .replace("#translate#", `${options.translate}`);
        return callback(null, rendered);
    });
});
app.set('views', './views');
app.set('view engine', 'page');

//Routes
app.use('/intermediate', intermediateRoute)
// app.use('/api/advanced', advancedRoute)
app.get('/', (req, res) => {
    const data = {
        word: "привет",
        pronunciation: "privet",
        translate: "Hello",
    };

    res.render('index', data); //Include a form within a rendered view that allows for interaction with your RESTful API.
});

app.get('/beginner', async(req, res) => {
    try {
        const beginner = await card.find({});
        res.status(200).json(beginner);
    } catch (error) {
        res.status(500).send('Not Found')
    }
    })

app.get("/beginner/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const Card = await card.findById(id)
        res.status(200).json(Card);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
})

// POST request
app.post('/new', async(req, res) => {
    try {
        const Card = await card.create(req.body);
        res.status(200).send(Card);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
});

//PUT Request
app.put('/beginner/:id', async(req,res) => {
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
});

// DELETE Request
app.delete('/beginner/:id', async(req,res) => {
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

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

