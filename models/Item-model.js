const mongoose = require('mongoose')

const Item = new mongoose.Schema({
    name: String,
    price: Number,
    iva: Number,
    format: String,
    supplier: String,
    category: String,
    packQuantity: Number
})

module.exports = mongoose.model('items', Item)