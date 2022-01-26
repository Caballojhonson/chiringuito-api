const mongoose = require('mongoose')

const Expense = new mongoose.Schema({
    amount: Number,
    fromOrder: {type: Schema.Types.ObjectId, ref: 'orders'},
    payedBy: String,
    payedOn: Date,
    isRecurrent: { type: Boolean, default: false },
    concept: { type: String, default: 'order' }
})

module.exports = mongoose.model('expenses', Expense)