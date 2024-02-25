// Create a template model for data input
const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        word: {
            type: String,
            required: [true, 'Enter your name here']
        },
        translation: {
            type: String,
            required: true,
        }
    }
)

const card = mongoose.model('Card', schema);

module.exports = card;