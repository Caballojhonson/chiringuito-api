const express = require('express')

const router = express.Router()

const salaryCtrl = require('../controllers/salary-ctrl')

router.get('/salaries', salaryCtrl.getSalaries)
router.post('/salary', salaryCtrl.createSalary)

module.exports = router