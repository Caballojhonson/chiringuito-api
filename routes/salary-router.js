const express = require('express')

const router = express.Router()

const salaryCtrl = require('../controllers/salary-ctrl')

router.get('/salaries', salaryCtrl.getSalaries)
router.post('/new-salary', salaryCtrl.createSalary)
router.put('/update-salary/:id', salaryCtrl.updateSalary)
router.delete('/delete-salary/:id', salaryCtrl.deleteSalary)
router.get('/get-salary/:id', salaryCtrl.getSalaryById)

module.exports = router