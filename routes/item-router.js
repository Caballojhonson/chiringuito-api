const express = require('express')

const router = express.Router()

const itemCtrl = require('../controllers/item-ctrl')

router.get('/', itemCtrl.getItems)
router.post('/new', itemCtrl.createItem)
router.put('/update/:id', itemCtrl.updateItem)
router.delete('/delete/:id', itemCtrl.deleteItem)

module.exports = router