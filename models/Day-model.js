const mongoose = require('mongoose')

const Day = new mongoose.Schema({
    isOpen: Boolean,
    openingCash: Number,
    closingCash: Number,
    totalBalance: Number,
    by: String,
    timestamp: Date,
    operations: [{
        usr: String,
        type: String,
        timestamp: Date,
        concept: String,
        bizum: Boolean,
        amount: Number
    }]
})

//Add virtual for totalBalance

module.exports = mongoose.model('days', Day)