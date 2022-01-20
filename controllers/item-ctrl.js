const Item = require('../models/Item-model.js')

createItem = (req, res) => {
    const body = req.body

    if (!body) {
        console.log(req)
        return res.status(400).json({
            success: false,
            error: `You must provide an Item object. Request body is ${body}.`,
        })
    }

    const item = new Item(body)

    if (!item) {
        return res.status(400).json({ success: false, error: err })
    }

    item
    .save()
    .then(() => {
        return res.status(201).json({
            success: true,
            id: item._id,
            message: 'Item created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Item NOT created!',
        })
    })
}

getItems = async (req, res) => {
    await Item.find({}, (err, items) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!items.length) {
            return res
                .status(404)
                .json({ success: false, error: `No items found` })
        }

        return res.status(200).json({ success: true, data: items })
    })
    .sort({"name":1}) //TEST!!
    .catch(err => console.log(err))
}

updateItem = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Item.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Item not found!',
            })
        }

        item.name = body.name
        item.price = body.price
        item.iva = body.iva
        item.format = body.format
        item.supplier = body.supplier
        item.category = body.category
        item.packQuantity = body.packQuantity

        item
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: item._id,
                    message: 'Item updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Item not updated!',
                })
            })
    })
}

deleteItem = async (req, res) => {
    await Item.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `Item not found` })
        }

        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}

module.exports = {
    createItem,
    getItems,
    updateItem,
    deleteItem
}