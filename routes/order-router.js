const express = require('express')

const router = express.Router()

const orderCtrl = require('../controllers/order-ctrl')

router.get('/', orderCtrl.getOrders)
router.post('/new', orderCtrl.createOrder)

module.exports = router