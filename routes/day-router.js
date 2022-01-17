const express = require('express')

const router = express.Router()

const dayCtrl = require('../controllers/day-ctrl')

router.get('/', dayCtrl.getDays)
router.post('/new', dayCtrl.createDay)
router.put('/update/:id', dayCtrl.updateDay)
router.put('/newop/:id', dayCtrl.addOperation)

module.exports = router