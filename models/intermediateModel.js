const mongoose = require('mongoose');

const intermediateSchema = new mongoose.Schema(
    {
        topic: {
            type: String,
            required: true
        },
        word: {
            type: String,
            required: true,
        },
        phrase: {
            type: String,
            required: true,
        },
        translation: {
            type: String,
            required: true
        }
    }
)



module.exports = mongoose.model('Intermediate', intermediateSchema);