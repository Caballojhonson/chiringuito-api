const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const Order = new mongoose.Schema({
        submittedAt: Date,
        submittedBy: String,
        supplier: String,
        orderStatus: String,
        paymentStatus: String,
        totalPrice: Number,
        isArchived: Boolean,
        items: [{
            type: Schema.Types.ObjectId, ref: 'Item' 
        }]
})

module.exports = mongoose.model('orders', Order)