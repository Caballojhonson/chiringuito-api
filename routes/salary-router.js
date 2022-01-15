const express = require('express')

const router = express.Router()

const salaryCtrl = require('../controllers/salary-ctrl')

router.get('/', salaryCtrl.getSalaries)
router.post('/new', salaryCtrl.createSalary)
router.put('/update/:id', salaryCtrl.updateSalary)
router.delete('/delete/:id', salaryCtrl.deleteSalary)
router.get('/get/:id', salaryCtrl.getSalaryById)

module.exports = router