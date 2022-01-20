const Salary = require('../models/Salary-model.js')

createSalary = (req, res) => {
    const body = req.body

    if (!body) {
        console.log(req)
        return res.status(400).json({
            success: false,
            error: `You must provide a salary. Request body is: ${body}.`,
        })
    }

    const salary = new Salary(body)

    if (!salary) {
        return res.status(400).json({ success: false, error: err })
    }

    salary
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: salary._id,
                message: 'Salary created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Salary not created!',
            })
        })
}

getSalaries = async (req, res) => {
    await Salary.find({}, (err, salaries) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!salaries.length) {
            return res
                .status(404)
                .json({ success: false, error: `Salary not found` })
        }
        return res.status(200).json({ success: true, data: salaries })
    })
    .sort({ date: 1 })
    .catch(err => console.log(err))
}

updateSalary = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Salary.findOne({ _id: req.params.id }, (err, salary) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        salary.date = body.date
        salary.user = body.user
        salary.amount = body.amount
        salary.isPayed = body.isPayed
        salary
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: salary._id,
                    message: 'Salary updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Salary not updated!',
                })
            })
    })
}

deleteSalary = async (req, res) => {
    await Salary.findOneAndDelete({ _id: req.params.id }, (err, salary) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!salary) {
            return res
                .status(404)
                .json({ success: false, error: `Salary not found` })
        }

        return res.status(200).json({ success: true, data: salary })
    }).catch(err => console.log(err))
}

getSalaryById = async (req, res) => {
    await Salary.findOne({ _id: req.params.id }, (err, salary) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!salary) {
            return res
                .status(404)
                .json({ success: false, error: `Salary not found` })
        }
        return res.status(200).json({ success: true, data: salary })
    }).catch(err => console.log(err))
}


module.exports = {
    createSalary,
    getSalaries,
    updateSalary,
    deleteSalary,
    getSalaryById
}