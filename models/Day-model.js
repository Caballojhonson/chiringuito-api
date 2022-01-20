const mongoose = require('mongoose')

const Day = new mongoose.Schema({
    isOpen: Boolean,
    openingCash: Number,
    closingCash: {type: Number, default: 0},
    closingTime: {type: Date, default: new Date()},
    totalBalance: {type: Number, default: 0},
    usr: {type: String, default: 'Anon'},
    timestamp: Date,
    operations: [{
        usr: {type: String, default: 'Anon'},
        timestamp: Date,
        concept: {type: String, default: 'Ni puta idea'},
        bizum: {type: Boolean, default: false},
        amount: {type: Number, default: 0},
        opType: {type: String, default: ''}
    }],
})

//Add virtual for totalBalance

module.exports = mongoose.model('days', Day)