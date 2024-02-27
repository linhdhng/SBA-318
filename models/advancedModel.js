const mongoose = require('mongoose');

const advancedSchema = new mongoose.Schema(
    {
        topic: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        edited: {
            type: Boolean
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Advanced', advancedSchema);
