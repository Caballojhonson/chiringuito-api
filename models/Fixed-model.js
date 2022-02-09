const mongoose = require('mongoose')

const Fixed = new mongoose.Schema({
    amount: Number,
    createdBy: String,
    createdOn: Date,
    concept: { type: String, default: 'Gasto fijo' },
    dueBy: {type: Number}, //Day of month
    frequency: {type: Number, required: true}
})

module.exports = mongoose.model('fixed', Fixed)