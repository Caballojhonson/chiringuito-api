const mongoose = require('mongoose')

const Order = new mongoose.Schema({
        submittedAt: Date,
        submittedBy: String,
        totalPrice: Number,
        isArchived: Boolean,
        orders: [{
            supplier: String,
            totalPrice: Number,
            orderStatus: String,
            paymentStatus: String,
            isArchived: Boolean,
            items: [{
                type: mongoose.Schema.ObjectId, ref: 'Item' 
            }]
        }]
})

module.exports = mongoose.model('orders', Order)