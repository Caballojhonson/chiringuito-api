const express = require('express')

const router = express.Router()

const debtCtrl = require('../controllers/debt-ctrl')

router.get('/', debtCtrl.getDebts)
router.post('/new', debtCtrl.createDebt)
router.put('/update/:id', debtCtrl.updateDebt)
router.delete('/delete/:id', debtCtrl.deleteDebt)

module.exports = router