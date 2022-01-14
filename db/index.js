const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mern:JAUBBCvA4CMn1X82jQFS@mern-cluster.y22mw.mongodb.net/chiringuito?retryWrites=true&w=majority', () => {
    console.log('Database connected')
})

const db = mongoose.connection

module.exports = db