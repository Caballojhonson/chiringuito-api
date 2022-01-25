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
    // order.items.forEach(item => {
    //     item.totalPrice = item.quantity * item.item.price
    // });

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
    .populate("items")
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


module.exports = {
    createOrder,
    getOrders,
}