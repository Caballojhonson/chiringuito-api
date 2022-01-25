const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const Order = new mongoose.Schema({
        submittedAt: Date,
        submittedBy: String,
        week: Date,
        supplier: String,
        orderStatus: String,
        paymentStatus: String,
        totalPrice: Number,
        isArchived: Boolean,
        items: [{
            type: Schema.Types.ObjectId, ref: 'items' 
        }]
})

module.exports = mongoose.model('orders', Order)