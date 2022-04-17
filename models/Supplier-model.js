const mongoose = require('mongoose')

const Supplier = new mongoose.Schema({ 
    name: String,
    cif: String,
    phoneNumber: String,
    admitsDebt: Boolean,
    delivery: String,
    delivers: Boolean,
})

module.exports = mongoose.model('Suppliers', Supplier)