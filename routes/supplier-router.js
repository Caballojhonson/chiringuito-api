const express = require('express')

const router = express.Router()

const supplierCtrl = require('../controllers/supplier-ctrl')

router.get('/', supplierCtrl.getSalaries)
router.post('/new', supplierCtrl.createSupplier)
router.put('/update/:id', supplierCtrl.updateSupplier)
router.delete('/delete/:id', supplierCtrl.deleteSupplier)
router.get('/get/:id', supplierCtrl.getSupplierById)

module.exports = router