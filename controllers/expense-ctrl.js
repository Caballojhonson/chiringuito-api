const Expense = require('../models/Expense-model.js')

createExpense = (req, res) => {
    const body = req.body

    if (!body) {
        console.log(req)
        return res.status(400).json({
            success: false,
            error: `You must provide an Expense object. Request body is ${body}.`,
        })
    }

    const expense = new Expense(body)

    if (!expense) {
        return res.status(400).json({ success: false, error: err })
    }

    expense
    .save()
    .then(() => {
        return res.status(201).json({
            success: true,
            id: expense._id,
            message: 'Expense created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Expense NOT created!',
        })
    })
}

getExpenses = async (req, res) => {
    await Expense.find({})
    .populate('fromOrder')
    .exec((err, expenses) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }
        if (!expenses.length) {
            return res
                .status(404)
                .json({ success: false, error: `No expenses found` })
        }

        return res.status(200).json({ success: true, data: expenses })
    })
}

updateExpense = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Expense.findOne({ _id: req.params.id }, (err, expense) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Expense not found!',
            })
        }

        if (body.amount) expense.amount = body.amount
        if (body.fromOrder) expense.fromOrder = body.fromOrder
        if (body.concept) expense.concept = body.concept

        expense
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: expense._id,
                    message: 'Expense updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Expense not updated!',
                })
            })
    })
}

deleteExpense = async (req, res) => {
    await Expense.findOneAndDelete({ _id: req.params.id }, (err, expense) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!expense) {
            return res
                .status(404)
                .json({ success: false, error: `Expense not found` })
        }

        return res.status(200).json({ success: true, data: expense })
    }).catch(err => console.log(err))
}

module.exports = {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
}