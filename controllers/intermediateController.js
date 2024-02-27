const Intermediate = require('../models/intermediateModel');
const { mongoose } = require('mongoose');

const createIntermediate = async(req, res) => {
    try {
        const Intermediate = await intermediate.create(req.body);
        res.status(200).send({message: 'Card created'}, Intermediate);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
}

const updateIntermediate = async(req,res) => {
    try {
    const {id} = req.params;
    const intermediate = await Intermediate.findByIdAndUpdate(id, req.body);
    if(!intermediate) {
        return res.status(404).send(`Cannot find any card with ${_id}`);
    }
    const updatedCard = await Intermediate.findById(id)
    res.status(200).json({message: 'Card has been updated'},updatedCard);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found')
    }
}

const deleteIntermediate = async(req,res) => {
    try {
        const {id} = req.params;
        const intermediate = await Intermediate.findByIdAndDelete(id);
        if(!intermediate){
            return res.status(404).send({message: `Cannot find card with id: ${id}`});
        }
        res.status(200).json({message: 'Card has been deleted.'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Not Found');
    };
}
module.exports = {createIntermediate, updateIntermediate, deleteIntermediate};