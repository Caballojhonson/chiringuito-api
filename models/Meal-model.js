const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const Meal = new mongoose.Schema({
        name: String,
        rationNumber: Number,
        category: String,
        prepTime: Number,
        timeFormat: String,
        isIntermediate: Boolean,
        finalWeight: Number,
        timestamp: Date,
        pvp: Number,
        totalCost: Number,
        costPerRation: Number,
        costPerKilo: Number,
        profitPerRation: Number,
        margin: Number,
        ingredients: [{type: Schema.Types.ObjectId, ref: 'items'}],
        quantities: [{
            ingredient: {type: Schema.Types.ObjectId, ref: 'items'},
            quantity: Number
        }],
        supplements: [{
            concept: {type: String, default: 'No especificado'},
            percentage: Number
        }]
})

module.exports = mongoose.model('meals', Meal)