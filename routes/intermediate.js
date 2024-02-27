const express = require('express');
const router = express.Router();
const Intermediate = require('../models/intermediateModel');
const {createIntermediate, updateIntermediate, deleteIntermediate} = require('../controllers/intermediateController.js');

router
    .route('/intermediate')
    .get(async(req, res) => {
        try {
            const intermediate = await Intermediate.find({});
            res.status(200).json(intermediate);
        } catch (error) {
            res.status(500).send('Not Found')
        }
        })
    .post(createIntermediate)
    .patch(updateIntermediate)
    .delete(deleteIntermediate);
        
router
    .route('/:id')
    .get(async(req, res) => {
        try {
            const {id} =  req.params;
            const intermediate = await Intermediate.findById(id)
            res.status(200).json(intermediate);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Not Found')
        }
    });

module.exports = router;