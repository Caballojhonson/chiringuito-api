const mongoose = require('mongoose')

const Salary = new mongoose.Schema({ 
    date: Date,
    user: String,
    amount: Number,
    isPayed: Boolean
})

module.exports = mongoose.model('Salaries', Salary)