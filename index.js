const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const db = require('./db')

const salaryRouter = require('./routes/salary-router')
const dayRouter = require('./routes/day-router')

const app = express()
const apiPort = '5000';

app.set('port', apiPort);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.listen(process.env.PORT || apiPort, () => console.log(`Server running on port ${apiPort}`))

app.use('/api/salaries', salaryRouter)
app.use('/api/days', dayRouter)

