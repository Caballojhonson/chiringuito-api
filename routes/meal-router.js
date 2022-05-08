const express = require('express')

const router = express.Router()

const mealCtrl = require('../controllers/meal-ctrl')

router.get('/', mealCtrl.getMeals)
router.get('/:id', mealCtrl.getOne)
router.post('/new', mealCtrl.createMeal)
router.put('/update/:id', mealCtrl.updateMeal)
router.delete('/delete/:id', mealCtrl.deleteMeal)

module.exports = router