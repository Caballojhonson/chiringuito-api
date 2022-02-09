const mongoose = require('mongoose')
, Schema = mongoose.Schema

const Debt = new mongoose.Schema({
    amount: Number,
    fromOrder: {type: Schema.Types.ObjectId, ref: 'orders'},
    generatedBy: String,
    generatedOn: Date,
    isRecurrent: { type: Boolean, default: false },
    concept: { type: String, default: 'order' },
    dueBy: {type: Number}, //Day of month
})

module.exports = mongoose.model('debts', Debt)