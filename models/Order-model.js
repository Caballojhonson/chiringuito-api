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
            item: {type: Schema.Types.ObjectId, ref: 'items'},
            quantity: Number,
            //totalPrice: Number
        }]
})

module.exports = mongoose.model('orders', Order)