const Day = require('../models/Day-model.js')

createDay = (req, res) => {
    const body = res.body

    if (!body) {
        console.log(req)
        return res.status(400).json({
            success: false,
            error: `You must provide a day object. Request body is ${body}.`,
        })
    }

    const day = new Day(body)

    if (!day) {
        return res.status(400).json({ success: false, error: err })
    }

    day
    .save()
    .then(() => {
        return res.status(201).json({
            success: true,
            id: day._id,
            message: 'Day created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Day NOT created!',
        })
    })
}

getDays = async (req, res) => {
    await Day.find({}, (err, days) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!days.length) {
            return res
                .status(404)
                .json({ success: false, error: `No days found` })
        }
        return res.status(200).json({ success: true, data: days })
    }).catch(err => console.log(err))
}

updateDay = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Day.findOne({ _id: req.params.id }, (err, day) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }

        // going to try and NOT do this:
        // day.isOpen = body.isOpen

        day
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: day._id,
                    message: 'Day updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Day not updated!',
                })
            })
    })
}

module.exports = {
    createDay,
    getDays,
    updateDay,
}