const Salary = require('../models/Salary-model.js')

createSalary = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a salary',
        })
    }

    const salary = new Salary(body)

    if (!salary) {
        return res.status(400).json({ success: false, error: err })
    }

    Salary
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
    }).catch(err => console.log(err))
}

module.exports = {
    createSalary,
    getSalaries,
}