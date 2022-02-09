const Fixed = require('../models/Fixed-model.js')

createFixed = (req, res) => {
    const body = req.body

    if (!body) {
        console.log(req)
        return res.status(400).json({
            success: false,
            error: `You must provide an Fixed object. Request body is ${body}.`,
        })
    }

    const fixed = new Fixed(body)

    if (!fixed) {
        return res.status(400).json({ success: false, error: err })
    }

    fixed
    .save()
    .then(() => {
        return res.status(201).json({
            success: true,
            id: fixed._id,
            message: 'Fixed created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Fixed NOT created!',
        })
    })
}

getFixeds = async (req, res) => {
    await Fixed.find({})
    .exec((err, fixeds) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }
        if (!fixeds.length) {
            return res
                .status(404)
                .json({ success: false, error: `No fixeds found` })
        }

        return res.status(200).json({ success: true, data: fixeds })
    })
}

updateFixed = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Fixed.findOne({ _id: req.params.id }, (err, fixed) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Fixed not found!',
            })
        }

        if (body.amount) fixed.amount = body.amount
        if (body.fromOrder) fixed.fromOrder = body.fromOrder
        if (body.concept) fixed.concept = body.concept
        if (body.dueBy) fixed.dueBy = body.dueBy

        fixed
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: fixed._id,
                    message: 'Fixed updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Fixed not updated!',
                })
            })
    })
}

deleteFixed = async (req, res) => {
    await Fixed.findOneAndDelete({ _id: req.params.id }, (err, fixed) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!fixed) {
            return res
                .status(404)
                .json({ success: false, error: `Fixed not found` })
        }

        return res.status(200).json({ success: true, data: fixed })
    }).catch(err => console.log(err))
}

module.exports = {
    createFixed,
    getFixeds,
    updateFixed,
    deleteFixed
}