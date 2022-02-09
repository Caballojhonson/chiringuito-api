const Debt = require('../models/Debt-model.js')

createDebt = (req, res) => {
    const body = req.body

    if (!body) {
        console.log(req)
        return res.status(400).json({
            success: false,
            error: `You must provide an Debt object. Request body is ${body}.`,
        })
    }

    const debt = new Debt(body)

    if (!debt) {
        return res.status(400).json({ success: false, error: err })
    }

    debt
    .save()
    .then(() => {
        return res.status(201).json({
            success: true,
            id: debt._id,
            message: 'Debt created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Debt NOT created!',
        })
    })
}

getDebts = async (req, res) => {
    await Debt.find({})
    .populate('fromOrder')
    .exec((err, debts) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }
        if (!debts.length) {
            return res
                .status(404)
                .json({ success: false, error: `No debts found` })
        }

        return res.status(200).json({ success: true, data: debts })
    })
}

updateDebt = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Debt.findOne({ _id: req.params.id }, (err, debt) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Debt not found!',
            })
        }

        if (body.amount) debt.amount = body.amount
        if (body.fromOrder) debt.fromOrder = body.fromOrder
        if (body.concept) debt.concept = body.concept
        if (body.dueBy) debt.dueBy = body.dueBy

        debt
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: debt._id,
                    message: 'Debt updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Debt not updated!',
                })
            })
    })
}

deleteDebt = async (req, res) => {
    await Debt.findOneAndDelete({ _id: req.params.id }, (err, debt) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!debt) {
            return res
                .status(404)
                .json({ success: false, error: `Debt not found` })
        }

        return res.status(200).json({ success: true, data: debt })
    }).catch(err => console.log(err))
}

module.exports = {
    createDebt,
    getDebts,
    updateDebt,
    deleteDebt
}