const express = require('express')

const router = express.Router()

const fixedCtrl = require('../controllers/fixed-ctrl')

router.get('/', fixedCtrl.getFixeds)
router.post('/new', fixedCtrl.createFixed)
router.put('/update/:id', fixedCtrl.updateFixed)
router.delete('/delete/:id', fixedCtrl.deleteFixed)

module.exports = router