const mongoose = require('mongoose')
, Schema = mongoose.Schema
const Expense = new mongoose.Schema({
    amount: Number,
    fromOrder: {type: Schema.Types.ObjectId, ref: 'orders'},
    payedBy: String,
    debtGeneratedOn: Date,
    payedOn: Date,
    isRecurrent: { type: Boolean, default: false },
    concept: { type: String, default: 'order' }
})

module.exports = mongoose.model('expenses', Expense)