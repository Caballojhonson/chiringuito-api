const express = require('express')
const cors = require('cors')

const db = require('./db')
const salaryRouter = require('./routes/salary-router')

const app = express()
const apiPort = '3000';

app.set('port', apiPort);

app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.listen(process.env.PORT || apiPort, () => console.log(`Server running on port ${apiPort}`))

app.use('/api', salaryRouter)

