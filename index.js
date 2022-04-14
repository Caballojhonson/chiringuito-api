const express = require('express')
const cors = require('cors')
// const cronBackup = require('./cron-jobs/backup')

const bodyParser = require('body-parser')
const db = require('./db')

const salaryRouter = require('./routes/salary-router')
const dayRouter = require('./routes/day-router')
const itemRouter = require('./routes/item-router')
const orderRouter = require('./routes/order-router')
const expenseRouter = require('./routes/expense-router')
const debtRouter = require('./routes/debt-router')
const fixedRouter = require('./routes/fixed-router')
const mealRouter = require('./routes/meal-router')

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
app.use('/api/items', itemRouter)
app.use('/api/orders', orderRouter)
app.use('/api/expenses', expenseRouter)
app.use('/api/debts', debtRouter)
app.use('/api/fixed', fixedRouter)
app.use('/api/meals', mealRouter)

