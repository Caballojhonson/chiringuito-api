const { startOfWeek } = require('date-fns')
const Order = require('../models/Order-model.js')

createOrder = (req, res) => {
    const body = req.body

    if (!body) {
        console.log(req)
        return res.status(400).json({
            success: false,
            error: `You must provide an order. Request body is: ${body}.`,
        })
    }

    const order = new Order(body)

    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }

    order.week = startOfWeek(new Date(order.submittedAt), { weekStartsOn: 1 })


    order
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'Order created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Order not created!',
            })
        })
}

getOrders = async (req, res) => {
    await Order.find({})
    .populate('items.item')
    .exec((err, orders) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: `No orders found` })
        }

        return res.status(200).json({ success: true, data: orders })
    })
}

updateOrder = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Order not found!',
            })
        }

        body.orderStatus && order.orderStatus = body.orderStatus
        body.paymentStatus && order.paymentStatus = body.paymentStatus
        body.isArchived && order.isArchived = body.isArchived
        body.items && order.items = body.items

        order
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: order._id,
                    message: 'Order updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Order not updated!',
                })
            })
    })
}

addItem = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Order
    .updateOne({ _id: req.params.id }, { $push: { items: body } }, (err, operation) => {
        if (err){
            return res.status(404).json({
                error,
                message: 'New item failed to be pushed',
            })
        }

        return res.status(200).json({
            success: true,
            id: operation._id,
            message: 'Pushed new item!',
        })

    })

}

deleteItem = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Order
    .updateOne({ _id: req.params.id }, { $pull: { items: {_id: body}  } }, (err, operation) => {
        if (err){
            return res.status(404).json({
                error,
                message: 'Item deletion failed...',
            })
        }

        return res.status(200).json({
            success: true,
            id: operation._id,
            message: 'Item deleted!',
        })

    })

}

deleteOrder = async (req, res) => {
    await Order.findOneAndDelete({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }

        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}


module.exports = {
    createOrder,
    getOrders,
    updateOrder,
    addItem,
    deleteItem,
    deleteOrder
}