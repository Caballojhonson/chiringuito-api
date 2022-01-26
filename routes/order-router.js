const express = require('express')

const router = express.Router()

const orderCtrl = require('../controllers/order-ctrl')

router.get('/', orderCtrl.getOrders)
router.post('/new', orderCtrl.createOrder)
router.put('/update/:id', orderCtrl.updateOrder)
router.put('/additem/:id', orderCtrl.addItem)
router.put('/removeitem/:id', orderCtrl.deleteItem)
router.delete('/delete/:id', orderCtrl.deleteOrder)




module.exports = router