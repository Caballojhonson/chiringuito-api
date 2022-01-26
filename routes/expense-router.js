const express = require('express')

const router = express.Router()

const expenseCtrl = require('../controllers/expense-ctrl')

router.get('/', expenseCtrl.getExpenses)
router.post('/new', expenseCtrl.createExpense)
router.put('/update/:id', expenseCtrl.updateExpense)
router.delete('/delete/:id', expenseCtrl.deleteExpense)

module.exports = router