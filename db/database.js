const mongoose = require('mongoose');

let db = mongoose.connect('mongodb+srv://linhduonghng:huonglinh110@cluster0.ycwyfla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
                .then(() => {
                    console.log('Connected to MongoDB!');
                }).catch((error) => {
                    console.log(error);
                });

module.exports = db;