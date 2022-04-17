const Supplier = require('../models/Supplier-model.js')

createSupplier = (req, res) => {
    const body = req.body

    if (!body) {
        console.log(req)
        return res.status(400).json({
            success: false,
            error: `You must provide a supplier. Request body is: ${body}.`,
        })
    }

    const supplier = new Supplier(body)

    if (!supplier) {
        return res.status(400).json({ success: false, error: err })
    }

    supplier
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: supplier._id,
                message: 'Supplier created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Supplier not created!',
            })
        })
}

getSalaries = async (req, res) => {
    await Supplier.find({}, (err, suppliers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!suppliers.length) {
            return res
                .status(404)
                .json({ success: false, error: `Supplier not found` })
        }
        return res.status(200).json({ success: true, data: suppliers })
    })
    .sort({ date: 1 })
    .catch(err => console.log(err))
}

updateSupplier = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Supplier.findOne({ _id: req.params.id }, (err, supplier) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        supplier.name = body.name
        supplier.cif = body.cif
        supplier.phoneNumber = body.phoneNumber
        supplier.admitsDebt = body.admitsDebt
        supplier.delivery = body.delivery
        supplier.delivers = body.delivers

        supplier
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: supplier._id,
                    message: 'Supplier updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Supplier not updated!',
                })
            })
    })
}

deleteSupplier = async (req, res) => {
    await Supplier.findOneAndDelete({ _id: req.params.id }, (err, supplier) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!supplier) {
            return res
                .status(404)
                .json({ success: false, error: `Supplier not found` })
        }

        return res.status(200).json({ success: true, data: supplier })
    }).catch(err => console.log(err))
}

getSupplierById = async (req, res) => {
    await Supplier.findOne({ _id: req.params.id }, (err, supplier) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!supplier) {
            return res
                .status(404)
                .json({ success: false, error: `Supplier not found` })
        }
        return res.status(200).json({ success: true, data: supplier })
    }).catch(err => console.log(err))
}


module.exports = {
    createSupplier,
    getSalaries,
    updateSupplier,
    deleteSupplier,
    getSupplierById
}