const mongoose = require('mongoose')

const Fixed = new mongoose.Schema({
    amount: Number,
    createdBy: String,
    createdOn: Date,
    concept: { type: String, default: 'Gasto fijo' },
    generateOn: {type: Number, default: 1}, //Day of month
    dueBy: {type: Number}, //Day of month
    frequency: {type: Number, required: true}
})

module.exports = mongoose.model('fixed', Fixed)